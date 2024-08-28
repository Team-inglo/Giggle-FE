import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import LanguagePicker from "@/components/tutorial/LanguagePicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export interface CarouselItem {
  id: number;
  keyword?: string;
  title: string;
  description?: string;
}

const LanguagePage = () => {
  const { height } = useWindowDimensions();
  const [language, setLanguage] = useState("");
  const router = useRouter();

  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            어떤 <Text style={styles.keyword}>언어</Text>를 사용하시나요?
          </Text>
          <Text style={styles.subTitle}>언어를 선택해주세요.</Text>
        </View>
        <LanguagePicker value={language} onClick={setLanguage} />
        <BottomButton
          state={language !== "" ? "activated" : "disabled"}
          text="시작하기"
          onPress={() => router.push("/login")}
        />
      </ThemedView>
    </>
  );
};

export default LanguagePage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 26,
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
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 36,
  },
  subTitle: {
    color: "#151515",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
});
