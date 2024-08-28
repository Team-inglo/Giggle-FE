import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import InfoItem from "@/components/signup/InfoItem";
import { SkipModal } from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const { societyUniteProgram } = useContext(SignupContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  const handleButtonClick = () => {
    imageUri !== null && router.push("/extraInfo/sejong");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={4}
          allPage={8}
          keyword="사회통합프로그램 증명서"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />
        <InfoItem label="등급" value={String(societyUniteProgram)} />
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
