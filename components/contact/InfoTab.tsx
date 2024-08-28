import { employInfo } from "@/constants/Users";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface infoTabProps {
  status: boolean;
  phoneNumber: string;
  email: string;
  setStatus: Dispatch<SetStateAction<boolean>>;
  onType: Dispatch<SetStateAction<employInfo>>;
}

interface TabSelectorProps {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  tab1: string;
  tab2: string;
}

export const TabSelector = ({status, setStatus, tab1, tab2}: TabSelectorProps) => {
  return (
    <>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setStatus(true)}
            style={
              status === true
                ? [styles.tab, styles.selected]
                : styles.tab
            }
          >
            <Text>{tab1}</Text>
          </Pressable>
          <Pressable
            onPress={() => setStatus(false)}
            style={
              status === false
                ? [styles.tab, styles.selected]
                : styles.tab
            }
          >
            <Text>{tab2}</Text>
          </Pressable>
        </View>
    </>
  )
}

const InfoTab = ({
  status,
  phoneNumber,
  email,
  setStatus,
  onType,
}: infoTabProps) => {
  return (
    <>
      <View style={styles.background}>
        <TabSelector status={status} setStatus={setStatus} tab1="전화번호" tab2="이메일"/>
        <View style={styles.inputContainer}>
          {status === true ? (
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
