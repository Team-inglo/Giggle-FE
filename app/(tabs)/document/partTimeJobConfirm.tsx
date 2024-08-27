import PrevButton from "@/components/common/PrevButton";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const PartTimeJobConfirmPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/document/partTimeJobContact");
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            시간제 취업허가서를{"\n"}작성해야 해요.
          </Text>
          <Text style={styles.description}>
            유학생 담당자와 함께 작성하는 것이 좋습니다.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>시간제 취업허가서란?</Text>
          <Text style={styles.contentDescription}>
            외국인 유학생이 아르바이트를 하기 위해 작성해야 하는 시간제 취업허가서입니다.
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

export default PartTimeJobConfirmPage
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
