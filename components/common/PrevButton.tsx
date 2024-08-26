import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PrevIcon from "@/assets/images/CaretDown.svg";
import LogoIcon from "@/assets/images/Giggle.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import { useRouter } from "expo-router";

interface ButtonProps {
  isLogo: boolean;
  isDeletable?: boolean;
}

const PrevButton = ({ isLogo, isDeletable }: ButtonProps) => {
  const router = useRouter();
  return (
    <>
      <View style={styles.background}>
        {isLogo ? (
          <Pressable onPress={() => router.push("/")}>
            <LogoIcon />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.back()}>
            <PrevIcon />
          </Pressable>
        )}
        {isDeletable && <DeleteIcon />}
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
    justifyContent: "space-between",
  },
});
