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
import { useEffect, useState } from "react";
import { SkipModal } from "@/components/signup/InvalidModal";
import { requestSignatureDetailsGet } from "@/api/document/getSignatureStatusDetail";
import { DocumentDetail } from "@/interface/document/getSignatureDetailsStatus";

const DocumentDetailPage = () => {
  const { height } = useWindowDimensions();
  const { data } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { steps, date, currentMessage, isComplete } = JSON.parse(
    data as string
  );

  const initialDocumentDetail: DocumentDetail = {
    name: "",
    startDate: "",
    step: 0,
    completedDocuments: [],
    remainingSteps: [],
    stepComment: "",
    announcementId: 0,
    url: "",
  };

  const [logs, setLogs] = useState<DocumentDetail>(initialDocumentDetail); // 상세 상세 관리

  const access_token = 'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxLCJyb2xlIjoiQVBQTElDQU5UIiwiaWF0IjoxNzI0ODIyNDcyLCJleHAiOjE3MjU0MjcyNzJ9.yirYU820QAraRvwr3aJjtGYqZrCvQfoqjgEsGcyjyORbmrdqhy2FZiS1nU0S3BIJRtexHzEh7XZ0e2JoOffp2A'; // 실제 액세스 토큰으로 대체
  const userId = 1; // 실제 userId로 대체
  const applyId = 7;

  // 상태 정보 상세 조회 get method 연결은 되는데 왜..
  useEffect(() => {

    const fetchLogs = async () => {
      try {
        const data = await requestSignatureDetailsGet({ access_token, userId, applyId });
        if (data) {
          console.log("응답")
          console.log(data)
          setLogs(data); // 응답 데이터에서 로그 배열을 세팅
        }
      } catch (err) {
        console.log("error : ", err);
      } 
    };
  
    fetchLogs(); // 데이터 요청을 수행
  }, []);

  // 단계에 따라 상태 업데이트
  const getSteps = (currentStep: number): Step[] => {
    const stepLabels = ["제출", "표준\n근로계약서", "시간제\n취업허가서", "전자민원\n신청", "결과"];
    
    return stepLabels.map((label, index) => {
      if (index < currentStep) {
        return { label, status: "completed" };
      } else if (index === currentStep) {
        return { label, status: "current" };
      } else {
        return { label, status: "upcoming" };
      }
    });
  };

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton
          isLogo={false}
          isDeletable={true}
          setOpenModal={() => setIsModalOpen(true)}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>{logs.name}</Text>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>{logs.step >= 6 ? "완료" : "진행중"}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateTitle}>신청일</Text>
          <Text style={styles.dateText}>{logs.startDate}</Text>
        </View>
        <ProgressBar 
        steps={getSteps(logs.step)}
        date={logs.startDate} // log에 있는 startDate 사용
        currentMessage={logs.stepComment} // log에 있는 stepComment 사용
        isComplete={logs.step === 1} // 단계에 따라 완료 여부 결정
        />
        <Text style={styles.stageLeftTitle}>남은 단계</Text>
        <View style={styles.stageLeft}>
        {logs.remainingSteps.map((step, index) => (
          <Text key={step.id} style={styles.endedStageContainerText}>
            {index + 1}. {step.content}
          </Text>
        ))}
        </View>
        <DocumentBottomPanel
          state={"disabled"}
          text={"시간제 취업허가서 작성"}
          noticeMessage={currentMessage}
          isComplete={isComplete}
        />
        {isModalOpen && (
          <SkipModal
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="삭제하시겠습니까?"
            message="삭제 후 복구가 불가능합니다."
            buttonText="삭제"
            isDelete={true}
          />
        )}
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
    color: "#fff",
  },
  dateText: {
    fontSize: 16,
    lineHeight: 22,
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
    color: "#aaa",
  },
  stageLeft: {
    width: "100%",
  },
  stageLeftTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  stageLeftText: {
    width: "100%",
    fontSize: 16,
    lineHeight: 22,
  },
});
