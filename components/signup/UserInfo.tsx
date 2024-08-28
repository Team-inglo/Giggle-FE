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
      <View style={styles.inner}>
        {Object.entries(userInfo).map(([key, value]) => (
          <InfoItem key={key} label={key} value={value} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: "center",
    backgroundColor: "white",
  },
  inner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "white",
  }
});

export default UserInfo;
