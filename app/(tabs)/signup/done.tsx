import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import CheckIcon from "@/assets/images/Check.svg";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useEffect } from "react";

const DonePage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  }, []);
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <View style={styles.wrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkBoxLayoutChecked}>
              <CheckIcon width="31" height="31" stroke="white" />
            </View>
          </View>
          <Text style={styles.titleText}>회원가입 완료</Text>
        </View>
      </ThemedView>
    </>
  );
};

export default DonePage;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  checkboxContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxLayoutChecked: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FFB65A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },
});
