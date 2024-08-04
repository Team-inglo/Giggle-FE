import PrevButton from "@/components/common/PrevButton";
import UploadPassPort from '@/components/signup/UploadPassport';
import UserInfo from "@/components/signup/UserInfo";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { UserInfoState } from '@/constants/Users';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    여권번호: 'dwaldjldaldlsadh',
    이름: 'dwaldjld',
    체류자격: 'D-2-2',
    체류기간: '30 Days',
    발급일: '2019.01.01',
    국적: 'REPUBLIC OF KOREA',
  });
  const router = useRouter();

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>여권</Text>을{"\n"}선택해주세요
          </Text>
        </View>
        <UserInfo userInfo={userInfo} />
        <UploadPassPort />
        <BottomButton state={userInfo.여권번호 !== "" ? 'activated': 'disabled'} text="인증"/>
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
  title: {
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 57.6,
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
