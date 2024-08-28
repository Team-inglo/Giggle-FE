import { requestSignatureGet } from "@/api/document/getSignatureStatusList";
import Menu from "@/components/common/Menu";
import PrevButton from "@/components/common/PrevButton";
import { TabSelector } from "@/components/contact/InfoTab";
import ProgressCard from "@/components/document/ProgressCard";
import { ThemedView } from "@/components/ThemedView";
import { Log } from "@/interface/document/getSignatureList";
import { Step } from "@/interface/document/step";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

const ProgressPage = () => {
  const { width, height } = useWindowDimensions();

  const [logs, setLogs] = useState<Log[]>([]); // 상태로 로그 배열을 관리

  const access_token = 'eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxLCJyb2xlIjoiQVBQTElDQU5UIiwiaWF0IjoxNzI0ODIyNDcyLCJleHAiOjE3MjU0MjcyNzJ9.yirYU820QAraRvwr3aJjtGYqZrCvQfoqjgEsGcyjyORbmrdqhy2FZiS1nU0S3BIJRtexHzEh7XZ0e2JoOffp2A'; // 실제 액세스 토큰으로 대체
  const userId = 1; // 실제 userId로 대체
  const [status, setStatus] = useState(true); // 진행 중인 서류.(기본값))

  // 상태 정보 리스트로 조회 get method
  useEffect(() => {

  const fetchLogs = async () => {
    try {
      const data = await requestSignatureGet({ access_token, userId, status });
      if (data && data.logs) {
        setLogs(data.logs); // 응답 데이터에서 로그 배열을 세팅
      }
    } catch (err) {
      console.log("error : ", err);
    } 
  };

  fetchLogs(); // 데이터 요청을 수행
}, [status]);

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
      <ThemedView style={[styles.background, { width, height }]}>
        <PrevButton isLogo={true} />
        <TabSelector
          status={status}
          setStatus={setStatus}
          tab1="진행 중"
          tab2="완료"
        />
      <ScrollView 
      contentContainerStyle={styles.scrollViewContent} 
      showsVerticalScrollIndicator={false}
      > 
        {logs.map((log, index) => (
          <ProgressCard
            key={index} // 각 카드에 고유한 key 값 설정
            steps={getSteps(log.step)}
            date={log.startDate} // log에 있는 startDate 사용
            currentMessage={log.stepComment} // log에 있는 stepComment 사용
            isComplete={log.step === 1} // 단계에 따라 완료 여부 결정
          />
        ))}
      </ScrollView>
        <Menu />
      </ThemedView>
    </>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
  },
  scrollViewContent: {
     paddingBottom: 100,
  },
});
