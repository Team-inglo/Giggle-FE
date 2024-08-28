import BottomPanel from "@/components/extraInfo/BottomPanel";
import MapWebView from "@/components/extraInfo/MapWebView";
import PageHeader from "@/components/extraInfo/PageHeader";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";

export interface Address {
  main: string;
  sub: string;
}

const ResidencePage = () => {
  const { height } = useWindowDimensions();
  const { university, degree } = useContext(SignupContext);
  const [whichModalIsVisible, setWhichModalIsVisible] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<Address>({
    main: "",
    sub: "", // 웹뷰와 통신 적용 필요, 현재는 사전 입력으로 넘길 것
  });
  const router = useRouter();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data: Address = JSON.parse(event.nativeEvent.data);
      setAddress(data);
      console.log("Received address from WebView:", data);
      // 여기서 주소 데이터를 사용하여 필요한 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error parsing WebView message:", error);
    }
  };

  const handleButtonClick = () => {
    setWhichModalIsVisible("confirm");
  };
  const handleConfirm = () => {
    router.push({pathname: "/pastSemester", params: {}});
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={7}
          allPage={8}
          keyword="거주지"
          title={"를\n등록해주세요."}
          description="맞춤형 아르바이트 광고 제공을 위해 필요해요."
        />
        <MapWebView
          url={"https://giggle-fe.vercel.app/map"}
          onMessage={handleWebViewMessage}
        />
        <BottomPanel
          state={"activated"}
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
          buttonText="Skip"
        />
        <SkipModal
          visible={whichModalIsVisible === "confirm"}
          onClose={() => setWhichModalIsVisible("")}
          title="등록된 주소가 확실한가요?"
          message="거주지를 기반으로 아르바이트를 추천해드려요."
          onPress={handleConfirm}
          buttonText="예"
        />
      </ThemedView>
    </>
  );
};

export default ResidencePage;

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
