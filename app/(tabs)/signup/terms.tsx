import PrevButton from "@/components/common/PrevButton";
import AgreeTerms from "@/components/signup/AgreeTerms";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import {useLocalSearchParams, useRouter} from "expo-router";
import { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const TermsPage = () => {
  const { id , password } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [checkedEach, setCheckedEach] = useState([false, false, false]);
  const handleButtonClick = () => {
    signUp();
  };
  const signUp = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "serial_id": id,
          "password": password,
          "role": "APPLICANT",
          "device_token":"exampleexample1"
        }
      });
      const access_token = await response.data.data.access_token;
      if(access_token)
        !checkedEach.includes(false) && router.push({
          pathname:"/signup",
          params: {
            "access_token": access_token
          }
        });
    } catch (error) {
      console.error("회원가입 에러", error);
    }
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>약관 동의</Text>가 필요해요
          </Text>
        </View>
        <AgreeTerms checkedEach={checkedEach} setCheckedEach={setCheckedEach} />
        <BottomButton
          state={!checkedEach.includes(false) ? "activated" : "disabled"}
          text="시작하기"
          onPress={handleButtonClick}
        />
      </ThemedView>
    </>
  );
};

export default TermsPage;

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
    height: 70,
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
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 12,
  },
});
