import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import UploadFileIcon from "@/assets/images/FilePlus.svg";
import { UserInfoState } from "../../constants/Users";
import * as ImagePicker from "expo-image-picker";
interface Props {
  userInfo: UserInfoState;
}

const UploadPassPort = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
            <Text style={styles.label}>여권을 올려주세요.</Text>
            <Text style={styles.value}>
              5MB 이하만 가능합니다.(png, jpeg 파일)
            </Text>
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
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 22.4,
    color: "#1E1E1E",
  },
  value: {
    fontSize: 14,
    fontFamily: "Inter",
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
