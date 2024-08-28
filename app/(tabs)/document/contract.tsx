import PrevButton from "@/components/common/PrevButton";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const ContractPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/document/contact");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            표준 근로계약서를{"\n"}작성해야 해요.
          </Text>
          <Text style={styles.description}>
            고용주와 함께 작성하는 것이 좋습니다.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>표준 근로계약서란?</Text>
          <Text style={styles.contentDescription}>
            근로자가 노동에 대한 정당한 권리를 보장 받기 위해 사용자(회사)와
            체결한 계약 내용을 기재한 문서입니다.
          </Text>
        </View>
        <BottomButton
          state={"activated"}
          text="작성하기"
          onPress={handleButtonClick}
        />
      </ThemedView>
    </>
  );
};

export default ContractPage;

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
    width: 257,
    height: 149,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "NotoSans-Bold",
    fontWeight: "600",
    lineHeight: 36,
    height: 80,
  },
  description: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: "Roboto-Regular",
  },
  contentContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  contentTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Inter-Regular",
  },
});
