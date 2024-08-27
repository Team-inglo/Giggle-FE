import PrevButton from "@/components/common/PrevButton";
import { ProgressBar, Step } from "@/components/document/ProgressCard";
import { DocumentBottomPanel } from "@/components/extraInfo/BottomPanel";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import NextIcon from "@/assets/icons/next_Icon.svg";

const DocumentDetailPage = () => {
  const { height } = useWindowDimensions();
  const { data } = useLocalSearchParams();
  const { steps, date, currentMessage, isComplete } = JSON.parse(
    data as string
  );
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} isDeletable={true} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>파리바게트 파트타이머 모집</Text>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>진행중</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateTitle}>신청일</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <ProgressBar steps={steps} />
        <View style={styles.endedStages}>
          {steps.map(
            (step: Step, idx: number) =>
              step.status === "completed" && (
                <Pressable key={idx} style={styles.endedStageContainer}>
                  <Text style={styles.endedStageContainerText}>
                    {step.label.replace(/\n/g, " ")}
                  </Text>
                  <NextIcon />
                </Pressable>
              )
          )}
        </View>

        <Text style={styles.stageLeftTitle}>남은 단계</Text>
        <View style={styles.stageLeft}>
          {steps.map((step: Step, idx: number) => (
            <Text key={idx} style={styles.stageLeftText}>
              {idx + 1}. {step.label.replace(/\n/g, " ")}
            </Text>
          ))}
        </View>
        <DocumentBottomPanel
          state={"disabled"}
          text={"시간제 취업허가서 작성"}
          noticeMessage={currentMessage}
          isComplete={isComplete}
        />
      </ThemedView>
    </>
  );
};

export default DocumentDetailPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: 90,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "NotoSans-Bold",
    fontWeight: "600",
    lineHeight: 36,
    height: 37,
  },
  progressBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFB65A",
    width: 47,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 30,
  },
  progressBadgeText: {
    fontSize: 10,
    letterSpacing: 0,
    lineHeight: 16,
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
  dateText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Inter-Regular",
    marginBottom: 50,
  },
  endedStages: {
    marginTop: 35,
    marginBottom: 14,
  },
  endedStageContainer: {
    borderRadius: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#f2f2f2",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 9,
    paddingHorizontal: 7,
    marginBottom: 6,
  },
  endedStageContainerText: {
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: "500",
    color: "#49454f",
    textAlign: "left",
  },
  dateTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#aaa",
  },
  stageLeft: {
    width: "100%",
  },
  stageLeftTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  stageLeftText: {
    width: "100%",
    fontSize: 16,
    lineHeight: 22,
  },
});
