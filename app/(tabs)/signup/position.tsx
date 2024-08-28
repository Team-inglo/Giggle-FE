import PrevButton from "@/components/common/PrevButton";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import InvisibleIcon from "@/assets/images/invisible.svg";

interface userSignUpInfo {
  id: string;
  password: string;
  passwordCheck: string;
}

const IdPwPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [signUpInfo, setSignUpInfo] = useState<userSignUpInfo>({
    id: "",
    password: "",
    passwordCheck: "",
  });
  const handleButtonClick = (type: string) => {
    type === "유학생" ? router.push("/signup/idPw") : router.push("/webview")
  };
  const items = [
    "추천 아르바이트 공고 확인",
    "아르바이트 신청 서류 관리",
    "근로 캘린더 작성",
    "법률 자문 챗봇 이용",
  ];
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>회원가입</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            아르바이트를 구하고 싶은{"\n"}
            <Text style={styles.keyword}>외국인 유학생</Text>
          </Text>
          <View style={styles.container}>
            {items.map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
          <BottomButton
            state={"activated"}
            text="유학생 가입"
            onPress={() => handleButtonClick("유학생")}
          />
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            외국인 아르바이트생을{"\n"}구하고 싶은
            <Text style={styles.keyword}>고용주</Text>
          </Text>
          <View style={styles.container}>
              <View key={1} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>아르바이트 공고 등록</Text>
              </View>
              <View key={2} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>지원자 서류 관리</Text>
              </View>
          </View>
          <BottomButton
            state={"activated"}
            text="고용주 가입"
            onPress={() => handleButtonClick("고용주")}
          />
        </View>
      </ThemedView>
    </>
  );
};

export default IdPwPage;

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
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  subTitleContainer: {
    display: "flex",
    height: "40%",
    width: "100%",
  },
  title: {
    color: "black",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 57.6,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 12,
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  disabled: {
    width: 35,
    height: 24,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activated: {
    width: 35,
    height: 26,
    backgroundColor: "#383838",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#383838",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activatedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  disabledText: {
    color: "#B3B3B3",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  container: {
    padding: 16,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
});
