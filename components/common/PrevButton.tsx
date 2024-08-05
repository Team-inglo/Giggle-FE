import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PrevIcon from "@/assets/images/CaretDown.svg";
import { useRouter } from "expo-router";

const PrevButton = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.background}>
        <Pressable onPress={() => router.back()}>
          <PrevIcon />
        </Pressable>
      </View>
    </>
  );
};

export default PrevButton;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 64,
    marginTop: 24,
    left: -5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
