import { requestSignature } from "@/api/document/requestSignature";
import PrevButton from "@/components/common/PrevButton";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { RequestSignatureDto } from "@/interface/document/requestSinatureInterface";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const IntegratedFormPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

  // >>> 서명요청용 변수 나중에 다른거랑 합쳐주세요
  const [announcementId, setAnnouncementId] = useState<number>(3);
  const [userId, setUserId] = useState<number>(1);

  const handleButtonClick = async () => {
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
    ];

    try {
      // access_token 값을 실제로 얻는 방법이 필요합니다.
      const access_token = ""; // 적절한 방식으로 access_token을 받아와야 함

      // 근로계약서의 documentType 정의
      await requestSignature({
        documentType: "INTEGRATED_APPLICATION", // >>> 나중에 type으로 정의 부탁해요..
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

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            통합신청서를{"\n"}작성해야 해요.
          </Text>
          <Text style={styles.description}>
            유학생 담당자와 함께 작성하는 것이 좋습니다.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>통합신청서란?</Text>
          <Text style={styles.contentDescription}>
            외국인 유학생이 행정 업무를 신청하기 위한 하는 통합 신청서입니다.
          </Text>
        </View>
        <BottomButton
          state={"activated"}
          text="작성하기"
          onPress={handleButtonClick}
        />
      </ThemedView>
    </>
  );
};

// Move export statement here
export default IntegratedFormPage;

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
    width: 257,
    height: 149,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "NotoSans-Bold",
    fontWeight: "600",
    lineHeight: 36,
    height: 80,
  },
  description: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Inter-Regular",
  },
});
