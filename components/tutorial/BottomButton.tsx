import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  text?: string;
  buttonText?: string;
  state: "disabled" | "activated";
  isRepresentive?: boolean;
  employerInfo?: { 전화번호: string; 이메일: string };
  onPress?: () => void;
  onLater?: () => void;
  onReinput?: () => void;
}

export const BottomButtonWithText = ({
  text,
  buttonText,
  state,
  onPress,
  onLater,
  onReinput,
  isRepresentive,
  employerInfo,
}: Props) => {
  return (
    <>
      <View style={styles.containerWithText}>
        {isRepresentive && (
          <View style={styles.employerInfoContainer}>
            <Text style={styles.employerInfoTitle}>고용주 연락처</Text>
            <Text style={styles.employerInfoText}>
              {employerInfo?.전화번호 !== "" && employerInfo?.전화번호}
            </Text>
            <Text style={styles.employerInfoText}>
              {employerInfo?.이메일 !== "" && employerInfo?.이메일}
            </Text>
          </View>
        )}
        <Text style={styles.descriptionText}>
          {text}에게 전송 후, <Text style={styles.keywordText}>서류</Text>{" "}
          페이지에서{"\n"}진행 상황을 확인할 수 있어요.
        </Text>
        <BottomButton text={buttonText} state={state} onPress={onPress} />
        <View style={styles.buttonContainer}>
          <Pressable onPress={onLater} style={styles.pressableTextContainer}>
            <Text style={styles.pressableText}>나중에 보낼래요.</Text>
          </Pressable>
          {isRepresentive && <Pressable onPress={onReinput} style={styles.pressableTextContainer}>
            <Text style={styles.pressableText}>
              고용주를 다른 연락처로 변경하고 싶어요.
            </Text>
          </Pressable>}
        </View>
      </View>
    </>
  );
};

const BottomButton = ({ text, state, onPress, ...otherProps }: Props) => {
  const handlePress = () => {
    if (state === "activated" && onPress) {
      onPress();
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={state === "activated" ? styles.activated : styles.disabled}
          onPress={handlePress}
        >
          <Text
            style={
              state === "activated" ? styles.activatedText : styles.disabledText
            }
          >
            {text}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  containerWithText: {
    width: "100%",
    justifyContent: "flex-end",
    display: "flex",
    bottom: 30,
  },
  employerInfoContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    bottom: 105,
  },
  employerInfoTitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "NotoSans-SemiBold",
  },
  employerInfoText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: "NotoSans-SemiBold",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    bottom: 30,
  },
  activated: {
    width: "100%",
    height: 50,
    padding: 12,
    backgroundColor: "#383838",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  disabled: {
    width: "100%",
    height: 50,
    padding: 12,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  activatedText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
  disabledText: {
    color: "#B3B3B3",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#151515",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    fontFamily: "NotoSans-Regular",
    bottom: 90,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  keywordText: {
    fontWeight: "700",
    fontFamily: "NotoSans-Bold",
  },
  pressableTextContainer: {
    bottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  pressableText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "NotoSans-Regular",
  },
});
