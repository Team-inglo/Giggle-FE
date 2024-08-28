import PrevButton from "@/components/common/PrevButton";
import Input from "@/components/login/Input";
import InputId from "@/components/login/inputId";
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
  const [isNotDuplicatedId, setIsNotDuplicatedId] = useState(false);
  const [isCheckDuplicatedId, setIsCheckDuplicatedId] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;
  const idRegx = /^[a-z0-9]{6,20}$/;
  const checkIdDuplicate = async () => {
    try {
      const response = await fetch(`https://api.giggle-inglo.com/api/v1/auth/id-duplicate?serial_id=${signUpInfo.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setIsNotDuplicatedId(data.data);
      setIsCheckDuplicatedId(true);
    } catch (error) {
      console.error("아이디 중복 확인 에러:", error);
    }
  };

  const inValidInputPassword =
    signUpInfo.password !== "" && !passwordRegex.test(signUpInfo.password);
  const inValidInputPasswordCheck =
    signUpInfo.passwordCheck !== "" &&
    signUpInfo.password !== signUpInfo.passwordCheck;
  const inValidInputId =
    signUpInfo.id !== "" && !idRegx.test(signUpInfo.id);
  const allClear =
    !inValidInputId &&
    isNotDuplicatedId &&
    !inValidInputPassword &&
    !inValidInputPasswordCheck &&
    signUpInfo.id !== "" &&
    signUpInfo.password !== "" &&
    signUpInfo.passwordCheck !== "";
  const handleButtonClick = () => {
    allClear && router.push({
      pathname:"/signup/terms",
      params:{
        id:signUpInfo.id,
        password:signUpInfo.password
      }
    });
  };

  let idValidCheckMessage;
  if (signUpInfo.id == "") idValidCheckMessage = "";
  else if (inValidInputId) idValidCheckMessage = "아이디는 영소문자나 숫자로 이루어진 6글자 이상 20자 미만이어야 합니다.";
  else if (!isCheckDuplicatedId) idValidCheckMessage =  "아이디 중복검사는 필수입니다.";
  else if (!isNotDuplicatedId) idValidCheckMessage = "아이디가 중복되었습니다.";
  else idValidCheckMessage = "가입이 가능한 아이디입니다";

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>회원가입</Text>
        </View>
        <View style={styles.loginSection}>
          <View style={styles.idInputSection}>
            <View style={styles.idInputContainer}>
              <InputId
                info={signUpInfo.id}
                onChangeText={(text) =>{
                  setIsCheckDuplicatedId(false);
                  setSignUpInfo({ ...signUpInfo, id: text })
                }}
                inValid={inValidInputId}
                isNotDuplicated={isNotDuplicatedId}
                isChecked={isCheckDuplicatedId}
                text={idValidCheckMessage}
                placeholder="아이디 입력"
              />
            </View>
            <TouchableOpacity
              style={signUpInfo.id !== "" ? styles.activated : styles.disabled}
              onPress={checkIdDuplicate}
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
