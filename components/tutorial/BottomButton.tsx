import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  text?: string;
  nextUrl?: string;
  state: "disabled" | "activated";
  onPress?: () => void;
}

const BottomButton = ({
  text,
  nextUrl,
  state,
  onPress,
  ...otherProps
}: Props) => {
  return (
    <>
      <View style={state === "activated" ? styles.activated : styles.disabled}>
        <Text>{text}</Text>
      </View>
    </>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  activated: {
    width: 311,
    height: 50,
    padding: 12,
    backgroundColor: "#383838",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    display: "flex",
    color: "white",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 16,
    marginTop: 20,
  },
  disabled: {
    width: 311,
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
    gap: 8,
    display: "flex",
    color: '#B3B3B3',
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 16,
    marginTop: 20,
  },
});
