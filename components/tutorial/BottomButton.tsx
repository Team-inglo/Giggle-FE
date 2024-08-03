import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  text?: string;
  state: "disabled" | "activated";
  onPress?: () => void;
}

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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    bottom: 30,
  },
  activated: {
    width: 311,
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
});
