import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import InfoItem from "@/components/signup/InfoItem";
import { SkipModal } from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import { ThemedView } from "@/components/ThemedView";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useContext, useEffect, useState} from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import {SignupContext} from "@/store/signupContext";

const SignUpPage = () => {
  const { access_token } = useLocalSearchParams();
  const { social_integration_program_score, updateSignupData} = useContext(SignupContext)
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if(imageUri !=null) socialIntegrationProgramRegistration(imageUri);
  }, [imageUri]);

  const socialIntegrationProgramRegistration = async (imageUri: any) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800, height: 1066 } }], // 크기를 800x1066으로 조정
        { compress: 1, format: ImageManipulator.SaveFormat.PNG } // 압축하지 않고, JPEG 포맷으로 저장
    );
    const formData = new FormData();
    const file = {
      uri: manipResult.uri,
      name: 'photo.png',
      type: 'image/png',
    } as unknown as Blob

    formData.append('file', file);
    try {
      const response = await axios.post(
          "https://api.giggle-inglo.com/api/v1/applicants/ocr/social-integration-program",
          formData,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );
      updateSignupData({ social_integration_program_score:response.data.data })
      console.log("OCR직후 데이터: ", social_integration_program_score )
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    console.log()
  };
  const updateSocialIntegrationProgram = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/social-integration-program`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          "social_integration_program_score":social_integration_program_score
        }
      });
      const success = await response.data.success;
      if(success) {
        router.push({
          pathname:"/extraInfo/sejong",
          params: {
            access_token: access_token
          }
        });
      }
    } catch (error) {
      console.error("사회통합프로그램 등록 에러", error);
    }
  }
  const handleButtonClick = () => {
    const isAllInfoFilled = social_integration_program_score!=="";
    if (isAllInfoFilled) {
      updateSocialIntegrationProgram();
    } else {
      setModalVisible(false);
    }
  };

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={2}
          allPage={5}
          keyword="사회통합프로그램 증명서"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />
        <InfoItem label="등급" value={String(social_integration_program_score)} />
        <UploadPassPort
          title="사회통합프로그램 증명서를 올려주세요."
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
