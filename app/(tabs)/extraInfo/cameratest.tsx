import { ThemedView } from "@/components/ThemedView";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { ImageType } from 'expo-camera/build/legacy/Camera.types';
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  const { height } = useWindowDimensions();
  const cameraRef = useRef<CameraView | null>(null);

  interface CapturedImage {
    uri: string;
    width: number;
    height: number;
    exif?: any;
    base64?: string;
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={requestPermission}>grant permission</Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    console.log("start");
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          imageType: ImageType.jpg,
          quality: 1,
        });
        console.log(photo);
        photo && setCapturedImage(photo);
      } catch (error) {
        console.error("Failed to take pickture: ", error);
      }
    }
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View style={styles.mask}></View>
            <View style={styles.centerMaskContainer}>
              <View style={styles.sideMask}></View>
              <View style={styles.cam}></View>
              <View style={styles.sideMask}></View>
            </View>
            <View style={styles.mask}></View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={takePicture}>
                <Pressable
                  disabled={!isCameraReady}
                  style={styles.shutter}
                  onPress={takePicture}
                >
                  <View style={styles.innerShutter} />
                </Pressable>
              </Pressable>
            </View>
          </CameraView>
        </View>
      </ThemedView>
    </>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    position: "relative",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  mask: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
  },
  sideMask: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  centerMaskContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
  },
  cam: {
    flex: 5,
  },
  shutter: {
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8b8b8b",
    borderRadius: 100,
  },
  innerShutter: {
    width: 50,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#8b8b8b",
    borderRadius: 100,
  },
});
