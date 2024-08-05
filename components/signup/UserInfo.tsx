import React from "react";
import { View, StyleSheet } from "react-native";
import InfoItem from "./InfoItem";
import {
  UserInfoState,
  userRegistrationCardState,
} from "../../constants/Users";

interface Props {
  userInfo: UserInfoState | userRegistrationCardState;
}

const UserInfo = ({ userInfo }: Props) => {
  return (
    <View style={styles.container}>
      {Object.entries(userInfo).map(([key, value]) => (
        <InfoItem key={key} label={key} value={value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default UserInfo;
