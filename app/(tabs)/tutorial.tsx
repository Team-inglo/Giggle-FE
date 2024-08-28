import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import Carousel from "@/components/tutorial/Carousel";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import * as Notifications from "expo-notifications";

export interface CarouselItem {
  id: number;
  keyword?: string;
  title: string;
  description?: string;
}

const tutorial = () => {
  const { height } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const getToken = async () => {
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
    console.log("hi");
  };
  const carouselData: CarouselItem[] = [
    { id: 1, title: "유학생을\n위한\n아르바이트\n도움 서비스" },
    {
      id: 2,
      keyword: "맞춤형 알바 공고",
      title: "를\n찾을 수 있어요",
      description: "여러분의 스펙에 맞게, 신청 가능한\n공고를 찾아드려요.",
    },
    {
      id: 3,
      keyword: "서류 ",
      title: "작업을 간소화해요",
      description:
        "표준 근로계약서, 시간제 취업 허가서 등\n서류 작업을 간편하게 진행해요.",
    },
    {
      id: 4,
      keyword: "근로캘린더",
      title: "를 작성하고,\n급여를 관리할 수 있어요",
      description: "근로캘린더에 알바 스케줄을 기록하고,\n월급을 계산해보세요.",
    },
  ];

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <Carousel data={carouselData} step={step} onSlide={setStep} />
        <View style={styles.buttonContainer}>
          <BottomButton
            state={step === 3 ? "activated" : "disabled"}
            text="시작하기"
            onPress={() => router.push("/language")}
          />
        </View>
      </ThemedView>
    </>
  );
};

export default tutorial;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: 257,
    height: 402,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 57.6,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
  }
});
