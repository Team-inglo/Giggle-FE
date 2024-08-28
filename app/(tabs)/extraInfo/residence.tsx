import BottomPanel from "@/components/extraInfo/BottomPanel";
import MapWebView from "@/components/extraInfo/MapWebView";
import PageHeader from "@/components/extraInfo/PageHeader";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const { university, degree } = useContext(SignupContext);
  const [whichModalIsVisible, setWhichModalIsVisible] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState({
    main: "",
    sub: "",
  });
  const router = useRouter();
  const handleButtonClick = () => {
    setWhichModalIsVisible("confirm");
  };
  const handleConfirm = () => {
    router.push("/extraInfo/done");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={5}
          allPage={5}
          keyword="거주지"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />

        <MapWebView url={"https://giggle-fe.vercel.app/map"}/>
        <BottomPanel
          state={imageUri !== null ? "activated" : "disabled"}
          text="다음"
          onPress={handleButtonClick}
          onSkip={() => setWhichModalIsVisible("skip")}
        />
        <SkipModal
          visible={whichModalIsVisible === "skip"}
          onClose={() => setWhichModalIsVisible("")}
          title="Skip 하시겠습니까?"
          message="맞춤형 서비스를 받지 못할 수도 있습니다."
          onPress={() => router.push("/")}
          buttonText='Skip'
        />
        <SkipModal
          visible={whichModalIsVisible === "confirm"}
          onClose={() => setWhichModalIsVisible("")}
          title="등록된 주소가 확실한가요?"
          message="거주지를 기반으로 아르바이트를 추천해드려요."
          onPress={handleConfirm}
          buttonText='예'
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
