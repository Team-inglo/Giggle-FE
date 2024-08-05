import PrevButton from "@/components/common/PrevButton";
import Input from "@/components/login/Input";
import InvalidModal from "@/components/signup/InvalidModal";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const inValidId = false;
  const inValidInputPassword =
    signUpInfo.password !== "" && !passwordRegex.test(signUpInfo.password);
  const inValidInputPasswordCheck =
    signUpInfo.passwordCheck !== "" &&
    signUpInfo.password !== signUpInfo.passwordCheck;
  const allClear =
    !inValidId &&
    !inValidInputPassword &&
    !inValidInputPasswordCheck &&
    signUpInfo.id !== "" &&
    signUpInfo.password !== "" &&
    signUpInfo.passwordCheck !== "";
  const handleButtonClick = () => {
    allClear && router.push("/signup/terms");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>회원가입</Text>
        </View>
        <View style={styles.loginSection}>
          <View style={styles.idInputSection}>
            <View style={styles.idInputContainer}>
              <Input
                info={signUpInfo.id}
                onChangeText={(text) =>
                  setSignUpInfo({ ...signUpInfo, id: text })
                }
                inValid={inValidId}
                text="이미 존재하는 아이디입니다."
                placeholder="아이디 입력"
              />
            </View>
            <TouchableOpacity
              style={signUpInfo.id !== "" ? styles.activated : styles.disabled}
            >
              <Text
                style={
                  signUpInfo.id !== ""
                    ? styles.activatedText
                    : styles.disabledText
                }
              >
                중복확인
              </Text>
            </TouchableOpacity>
          </View>
          <Input
            info={signUpInfo.password}
            onChangeText={(text) =>
              setSignUpInfo({ ...signUpInfo, password: text })
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
          <Input
            info={signUpInfo.passwordCheck}
            onChangeText={(text) =>
              setSignUpInfo({ ...signUpInfo, passwordCheck: text })
            }
            inValid={inValidInputPasswordCheck}
            text="비밀번호가 일치하지 않습니다."
            placeholder="비밀번호 재입력"
            isVisible={isPasswordVisible}
          >
            <Pressable
              style={styles.svgContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <InvisibleIcon />
            </Pressable>
          </Input>
        </View>
        <BottomButton
          state={allClear ? "activated" : "disabled"}
          text="인증"
          onPress={handleButtonClick}
        />
        {modalVisible && (
          <InvalidModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="체류자격 부적합"
            message="체류자격이 D-2 혹은 D-4인 경우에만 회원가입이 가능합니다."
          />
        )}
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
  title: {
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 57.6,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 12,
  },
  loginSection: {
    flex: 1,
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  idInputSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  idInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "85%",
  },
  disabled: {
    flex: 1,
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
    flex: 1,
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
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: 16,
  },
  disabledText: {
    color: "#B3B3B3",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: 16,
  },
  svgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
