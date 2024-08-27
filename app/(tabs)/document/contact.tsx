import PrevButton from "@/components/common/PrevButton";
import InfoTab from "@/components/contact/InfoTab";
import { SkipModal } from "@/components/signup/InvalidModal";
import { ThemedView } from "@/components/ThemedView";
import { BottomButtonWithText } from "@/components/tutorial/BottomButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const ContactPage = () => {
  const { height } = useWindowDimensions();
  const [employerInfo, setEmployerInfo] = useState({
    전화번호: "",
    이메일: "",
  });
  const [currentTab, setCurrentTab] = useState<string>("phone");
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/");
  };
  const isContactWritten =
    employerInfo.전화번호 !== "" || employerInfo.이메일 !== "";
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>표준 근로계약서</Text>를{"\n"}작성할
            고용주의{"\n"}연락처를 입력해주세요.
          </Text>
        </View>
        <InfoTab
          currentTab={currentTab}
          phoneNumber={employerInfo.전화번호}
          email={employerInfo.이메일}
          onPress={setCurrentTab}
          onType={setEmployerInfo}
        />
        <BottomButtonWithText
          state={isContactWritten ? "activated" : "disabled"}
          text="고용주"
          buttonText='전송하기'
          onPress={handleButtonClick}
          onLater={() => setIsModalOpen(true)}
        />
        {isModalopen && (
          <SkipModal
            visible={isModalopen}
            onClose={() => setIsModalOpen(false)}
            title="나중에 보내시나요?"
            message="서류 페이지에서 다시 확인할 수 있어요."
            buttonText='예'
          />
        )}
      </ThemedView>
    </>
  );
};

export default ContactPage;

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
    width: "100%",
    height: 100,
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
    height: 150,
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
