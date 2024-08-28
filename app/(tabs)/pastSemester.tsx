import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import Input from "@/components/login/Input";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState({
    main: "",
    sub: "",
  });
  const [pastSemester, setPastSemester] = useState("");
  const router = useRouter();
  const handleButtonClick = () => {};
  const handleConfirm = () => {
    router.push("/extraInfo/done");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={6}
          allPage={6}
          keyword="기타정보"
          title={"를\n등록해주세요."}
          description="정확한 정보를 작성해주세요."
        />

        <Input
          info={pastSemester}
          onChangeText={(text) => setPastSemester(text)}
          inValid={false}
          text=""
          placeholder="이수학기(현재까지 이수한 학기)"
        />
        <BottomPanel
          state={imageUri !== null ? "activated" : "disabled"}
          text="다음"
          onPress={handleButtonClick}
          onSkip={() => {}}
        />
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
  container: {
    flex: 1,
    width: "100%",
    height: 400,
  },
});
