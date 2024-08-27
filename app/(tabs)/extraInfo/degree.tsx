import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import InfoItem from "@/components/signup/InfoItem";
import InvalidModal from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const { university, degree } = useContext(SignupContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  const handleButtonClick = () => {
    imageUri !== null && router.push("/extraInfo/residence");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={4}
          allPage={5}
          keyword="성적증명서"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />
        <View style={styles.infoContainer}>
          <InfoItem label="대학" value={String(university)} />
          <InfoItem label="학점" value={String(degree)} />
        </View>

        <UploadPassPort
          title="성적증명서를 올려주세요."
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
          <InvalidModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="체류자격 부적합"
            message="체류자격이 D-2 혹은 D-4인 경우에만 회원가입이 가능합니다."
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
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: "center",
    justifyContent: "flex-start",
  }
});
