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

const PartTimeJobContactPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [employerInfo, setEmployerInfo] = useState({
    전화번호: "",
    이메일: "bian87@dgu.ac.kr",
  });
  const [representiveInfo, setRepresentiveInfo] = useState({
    전화번호: "",
    이메일: "bian87@dgu.ac.kr", // <<< - 이 데이터 업데이트 안 되어서 빈 값으로 들어오는 이슈
  });
  const [currentTab, setCurrentTab] = useState<boolean>(true);
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [isRepresentive, setIsRepresentive] = useState<boolean>(false);


  // >>> 서명요청용 변수 나중에 다른거랑 합쳐주세요
  const [announcementId, setAnnouncementId] = useState<number>(3);
  const [userId, setUserId] = useState<number>(1);

  const handleButtonClick = async () => {
    if(!isRepresentive) setIsRepresentive(true);
    setCurrentTab(true);

    // 유학생담당자까지 이메일을 입력한 경우
    if(isRepresentive) {
      console.log("시간제 취업허가서 서명 api를 호출합니다.", employerInfo.이메일, representiveInfo.이메일);

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
      {
        signingMethod: {
          type: "EMAIL",
          value: representiveInfo.이메일,
        },
        role: "교내유학생담당자",
        name: "교내유학생담당자",
      },
    ];

    try {
      // access_token 값을 실제로 얻는 방법이 필요합니다.
      const access_token = ""; // 적절한 방식으로 access_token을 받아와야 함

      // 근로계약서의 documentType 정의
      await requestSignature({
        documentType: "TIME_WORK_PERMIT", // >>> 나중에 type으로 정의 부탁해요..
        announcementId,
        userId,
        access_token,
        requestSignatureDto,
      });
      // router.push("/"); // 요청 성공 시 이동할 경로
    } catch (error) {
      console.error("이메일 전송 중 오류 발생", error);
    }
    }
  
  };
  const isContactWritten = () => {
    if (isRepresentive)
      return representiveInfo.전화번호 !== "" || representiveInfo.이메일 !== "";
    return employerInfo.전화번호 !== "" || employerInfo.이메일 !== "";
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>시간제 취업허가서를</Text>를{"\n"}
            작성할
            {isRepresentive ? " 유학생 담당자" : " 고용주"}의{"\n"}연락처를
            입력해주세요.
          </Text>
        </View>
        <InfoTab
          status={currentTab}
          phoneNumber={
            isRepresentive ? representiveInfo.전화번호 : employerInfo.전화번호
          }
          email={isRepresentive ? representiveInfo.이메일 : employerInfo.이메일}
          setStatus={setCurrentTab}
          onType={isRepresentive ? setRepresentiveInfo : setEmployerInfo}
        />
        <BottomButtonWithText
          state={isContactWritten() ? "activated" : "disabled"}
          text="고용주와 유학생 담당자"
          buttonText={isRepresentive ? "작성하기" : "다음"}
          onPress={handleButtonClick}
          onLater={() => setIsModalOpen(true)}
          onReinput={() => setIsRepresentive(false)}
          isRepresentive={isRepresentive}
          employerInfo={employerInfo}
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

export default PartTimeJobContactPage;

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
