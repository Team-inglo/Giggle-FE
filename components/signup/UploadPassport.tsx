import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import UploadFileIcon from "@/assets/images/FilePlus.svg";
import * as ImagePicker from "expo-image-picker";
interface Props {
  title: string;
  description: string;
  imageUri: string | null;
  setImageUri: Dispatch<SetStateAction<string | null>>;
}

const UploadPassPort = ({
  title,
  description,
  imageUri,
  setImageUri,
}: Props) => {

  const pickImage = async () => {
    console.log('pickImage 입장');
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log('permissionResult');

    if (permissionResult.granted === false) {
      alert("이미지 라이브러리 접근 권한이 필요합니다!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log('result', result);


    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <UploadFileIcon />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageWrapper}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>미리보기 이미지</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    width: "100%",
    height: 42,
  },
  labelContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    color: "#1E1E1E",
  },
  value: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    color: "#757575",
  },
  imageWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 174,
    aspectRatio: 16 / 9,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  placeholder: {
    width: "100%",
    height: 174,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#757575",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 174,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default UploadPassPort;
