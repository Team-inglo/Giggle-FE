import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import InvisibleIcon from "@/assets/images/invisible.svg";
import BottomButton from "@/components/tutorial/BottomButton";
import Divider from "@/components/login/Divider";
import FindAccountLinks from "@/components/login/FindAccountLinks";
import ToSignUpPage from "@/components/login/ToSignupPage";
import Input from "@/components/login/Input";

export interface userLoginInfo {
  email: string;
  password: string;
  passwordCheck?: string;
}

const LoginPage = () => {
  const { height } = useWindowDimensions();
  const [loginInfo, setLoginInfo] = useState<userLoginInfo>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const inValidInputId =
    loginInfo.email !== "" && !emailRegex.test(loginInfo.email);
  const inValidInputPassword =
    loginInfo.password !== "" && !passwordRegex.test(loginInfo.password);
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>로그인</Text>
        </View>
        <View style={styles.loginSection}>
          <Input
            info={loginInfo.email}
            onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
            inValid={inValidInputId}
            text="이메일 형식으로 입력해주세요"
            placeholder="이메일 입력"
          />
          <Input
            info={loginInfo.password}
            onChangeText={(text) =>
              setLoginInfo({ ...loginInfo, password: text })
            }
            inValid={inValidInputPassword}
            text="알파벳, 숫자, 특수문자를 포함한 8자 - 20자여야 합니다."
            placeholder="비밀번호 입력"
            isVisible={isPasswordVisible}
          >
            <Pressable
              style={styles.svgContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <InvisibleIcon />
            </Pressable>
          </Input>
          <BottomButton
            state={
              loginInfo.email !== "" && !inValidInputId && !inValidInputPassword
                ? "activated"
                : "disabled"
            }
            text="시작하기"
          />
        </View>
        <View style={styles.footer}>
          <View>
            <Divider />
            <FindAccountLinks />
          </View>
          <ToSignUpPage />
        </View>
      </ThemedView>
    </>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 25,
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
    paddingTop: 87,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 36,
  },
  loginSection: {
    flex: 5,
  },
  svgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 6,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});
