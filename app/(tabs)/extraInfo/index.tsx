import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import InfoItem from "@/components/signup/InfoItem";
import { SkipModal } from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

const SignUpPage = () => {
  const { topik_score, updateSignupData } = useContext(SignupContext);
  const { access_token } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(imageUri !=null) topikRegistration(imageUri);
  }, [imageUri]);

  const topikRegistration = async (imageUri: any) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800, height: 1066 } }], // 크기를 800x1066으로 조정
        { compress: 1, format: ImageManipulator.SaveFormat.PNG } // 압축하지 않고, JPEG 포맷으로 저장
    );
    const formData = new FormData();
    const file = {
      uri:manipResult.uri,
      name: 'photo.png',
      type: 'image/png',
    } as unknown as Blob

    formData.append('file', file);
    try {
      const response = await axios.post(
          "https://api.giggle-inglo.com/api/v1/applicants/ocr/topik",
          formData,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );
      updateSignupData({ topik_score: response.data.data });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const updateTopik = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/registration`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          "topik_score": topik_score
        }
      });
      const success = await response.data.success;
      if(success) {
        router.push({
          pathname:"/extraInfo/societyUniteProgram",
          params: {
            access_token: access_token
          }
        });
      }
    } catch (error) {
      console.error("토픽 등록 에러", error);
    }
  }
  const handleButtonClick = () => {
    const isAllInfoFilled = topik_score!=="";
    if (isAllInfoFilled) {
      updateTopik();
    } else {
      setModalVisible(true);
    }
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={1}
          allPage={5}
          keyword="TOPIK 증명서"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />
        <InfoItem label="등급" value={String(topik_score)} />
        <UploadPassPort
          title="TOPIK 증명서를 올려주세요."
          description="5MB 이하만 가능합니다. (png, jpeg 파일)"
          imageUri={imageUri}
          setImageUri={setImageUri}
        />
        <BottomPanel
          state={imageUri !== null ? "activated" : "disabled"}
          text="다음"
          onPress={handleButtonClick}
          onSkip={() => setModalVisible(true)}
        />
        {modalVisible && (
          <SkipModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Skip 하시겠습니까?"
            message="맞춤형 서비스를 받지 못할 수도 있습니다."
            buttonText='Skip'
          />
        )}
      </ThemedView>
    </>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
});
