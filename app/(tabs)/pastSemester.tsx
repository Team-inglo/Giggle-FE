import BottomPanel from "@/components/extraInfo/BottomPanel";
import PageHeader from "@/components/extraInfo/PageHeader";
import Input from "@/components/login/Input";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { SignupContext } from "@/store/signupContext";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState({
    main: "",
    sub: "",
  });
  const [pastSemester, setPastSemester] = useState("");
  const router = useRouter();
  const { access_token } = useLocalSearchParams(); // 이전 페이지에서 토큰 넘겨줘야 함, 아니면 별도 입력
  const handleButtonClick = () => {
    updateRegistration();
  };

  const updateRegistration = async () => {
    try {
      const response = await axios(
        `https://api.giggle-inglo.com/api/v1/applicants`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + { access_token },
            "Content-Type": "application/json",
          },
          data: { // useLocalSearchParams() 통해 이전 추가 정보 입력 페이지들에서 받아온 정보들 입력
            address_name: "",
            address_x: "",
            addreess_y: "",
            gpa: "",
            startDay: "",
            endDay: "",
          },
        }
      );
      const success = await response.data.data; // 응답 형식 확인 필요
      if (success) {
        router.push({
          pathname: "/extraInfo/done",
          params: {
            access_token: access_token,
          },
        });
      }
    } catch (error) {
      console.error("상세 정보 등록 에러", error);
    }
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PageHeader
          currentPage={6}
          allPage={6}
          keyword="기타정보"
          title={"를\n입력해주세요."}
          description="정확한 정보를 작성해주세요."
        />

        <Input
          info={pastSemester}
          onChangeText={(text) => setPastSemester(text)}
          inValid={false}
          text=""
          placeholder="이수학기(현재까지 이수한 학기)"
        />
        <BottomPanel
          state={imageUri !== null ? "activated" : "disabled"}
          text="완료"
          onPress={handleButtonClick}
          onSkip={() => {}}
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
