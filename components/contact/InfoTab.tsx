import { employInfo } from "@/constants/Users";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface infoTabProps {
  currentTab: string;
  phoneNumber: string;
  email: string;
  onPress: Dispatch<SetStateAction<string>>;
  onType: Dispatch<SetStateAction<employInfo>>;
}

const InfoTab = ({
  currentTab,
  phoneNumber,
  email,
  onPress,
  onType,
}: infoTabProps) => {
  return (
    <>
      <View style={styles.background}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => onPress("phone")}
            style={
              currentTab === "phone"
                ? [styles.tab, styles.selected]
                : styles.tab
            }
          >
            <Text>전화번호</Text>
          </Pressable>
          <Pressable
            onPress={() => onPress("email")}
            style={
              currentTab === "email"
                ? [styles.tab, styles.selected]
                : styles.tab
            }
          >
            <Text>이메일</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          {currentTab === "phone" ? (
            <TextInput
              value={phoneNumber}
              style={styles.input}
              placeholder="전화번호 입력"
              onChangeText={(text) => onType({ 전화번호: text, 이메일: email })}
            />
          ) : (
            <TextInput
              value={email}
              placeholder="이메일 입력"
              onChangeText={(text) =>
                onType({ 전화번호: phoneNumber, 이메일: text })
              }
            />
          )}
        </View>
      </View>
    </>
  );
};

export default InfoTab;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
    marginTop: 60,
  },
  tabContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 75,
  },
  tab: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 28,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
    display: "flex",
    justifyContent: "center",
  },
  selected: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  input: {
    borderBottomColor: "#d9d9d9",
  },
});
