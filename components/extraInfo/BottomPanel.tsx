import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  text?: string;
  state: "disabled" | "activated";
  onPress?: () => void;
  onSkip?: () => void;
}

const BottomPanel = ({
  text,
  state,
  onPress,
  onSkip,
  ...otherProps
}: Props) => {
  const handlePress = () => {
    if (state === "activated" && onPress) {
      onPress();
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Pressable style={styles.skip} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <Pressable
            style={state === "activated" ? styles.activated : styles.disabled}
            onPress={handlePress}
          >
            <Text
              style={
                state === "activated"
                  ? styles.activatedText
                  : styles.disabledText
              }
            >
              {text}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default BottomPanel;

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    bottom: 30,
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skip: {
    padding: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  skipText: {
    color: "#FFB65A",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  activated: {
    width: "40%",
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
    width: "40%",
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
