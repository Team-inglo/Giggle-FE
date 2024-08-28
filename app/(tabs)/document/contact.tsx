import { requestSignature } from "@/api/document/requestSignature";
import PrevButton from "@/components/common/PrevButton";
import InfoTab from "@/components/contact/InfoTab";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { BottomButtonWithText } from "@/components/tutorial/BottomButton";
import { RequestSignatureDto } from "@/interface/document/requestSinatureInterface";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const ContactPage = () => {
  const { height } = useWindowDimensions();
  const [employerInfo, setEmployerInfo] = useState({
    전화번호: "",
    이메일: "",
  });
  const [currentTab, setCurrentTab] = useState<boolean>(true);
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  
  const router = useRouter();

  // >>>  근로 계약서 서명 api를 위한 query 변수 정의(아르바이트 공고 id, userId)
  // >>>  userId -> localStorage로 저장 부탁 / announcementId -> routing으로 저장 부탁
  const [announcementId, setAnnouncementId] = useState<number>(3);
  const [userId, setUserId] = useState<number>(1);

  // 표준 근로계약서 서명 api
  const handleButtonClick = async () => {
    console.log("표준 근로계약서 서명 api를 호출합니다.");

    // RequestSignatureDto 객체 생성
    const requestSignatureDto: RequestSignatureDto = [
      {
        signingMethod: {
          type: "SECURE_LINK",
          value: "teaminglo236@gmail.com",
        },
        role: "외국인유학생",
        name: "외국인유학생",
      },
      {
        signingMethod: {
          type: "EMAIL",
          value: employerInfo.이메일,
        },
        role: "고용주",
        name: "고용주",
      },
    ];

    try {
      // access_token 값을 실제로 얻는 방법이 필요합니다.
      const access_token = "eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoxLCJyb2xlIjoiQVBQTElDQU5UIiwiaWF0IjoxNzI0ODE2NTc3LCJleHAiOjE3MjU0MjEzNzd9.2PtdqDmWezB_pKJ7pdl_82s5j7sEtkX9BlIPyF4lqBRcT3n7gS0SBfWbxB26P_GAOADY2UkFUmkauTNIaxx2Lw"; // 적절한 방식으로 access_token을 받아와야 함

      // 근로계약서의 documentType 정의
      await requestSignature({
        documentType: "EMPLOYMENT_CONTRACT", // >>> 나중에 type으로 정의 부탁해요..
        announcementId,
        userId,
        access_token,
        requestSignatureDto,
      });
      // router.push("/"); // 요청 성공 시 이동할 경로
    } catch (error) {
      console.error("이메일 전송 중 오류 발생", error);
    }
  };
  
  const isContactWritten =
    employerInfo.전화번호 !== "" || employerInfo.이메일 !== "";
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>표준 근로계약서</Text>를{"\n"}작성할
            고용주의{"\n"}연락처를 입력해주세요.
          </Text>
        </View>
        <InfoTab
          status={currentTab}
          phoneNumber={employerInfo.전화번호}
          email={employerInfo.이메일}
          setStatus={setCurrentTab}
          onType={setEmployerInfo}
        />
        <BottomButtonWithText
          state={isContactWritten ? "activated" : "disabled"}
          text="고용주"
          buttonText='전송하기'
          onPress={handleButtonClick}
          onLater={() => setIsModalOpen(true)}
        />
        {isModalopen && (
          <SkipModal
            visible={isModalopen}
            onClose={() => setIsModalOpen(false)}
            title="나중에 보내시나요?"
            message="서류 페이지에서 다시 확인할 수 있어요."
            buttonText='예'
          />
        )}
      </ThemedView>
    </>
  );
};

export default ContactPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: 100,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 36,
    height: 150,
  },
  description: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
  },
  contentContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  contentTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
});
