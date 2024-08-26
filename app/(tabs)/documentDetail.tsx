import Menu from "@/components/common/Menu";
import PrevButton from "@/components/common/PrevButton";
import { TabSelector } from "@/components/contact/InfoTab";
import ProgressCard from "@/components/document/ProgressCard";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const DocumentDetailPage = () => {
  const { height } = useWindowDimensions();
  const [currentTab, setCurrentTab] = useState("진행 중");
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={true} isDeletable={true}/>
        <TabSelector
          currentTab={currentTab}
          onPress={setCurrentTab}
          tab1="진행 중"
          tab2="완료"
        />
        <ProgressCard
          steps={[
            { label: "제출", status: "completed" },
            { label: "표준\n근로계약서", status: "current" },
            { label: "시간제\n취업허가서", status: "upcoming" },
            { label: "전자민원\n신청", status: "upcoming" },
            { label: "결과", status: "upcoming" },
          ]}
          date="1/19/24"
          currentMessage="현재 고용주가 표준 근로계약서를 확인 중이에요."
          isComplete={false}
        />
        <Menu />
      </ThemedView>
    </>
  );
};

export default DocumentDetailPage


const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
  },
});
