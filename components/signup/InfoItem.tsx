import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoIcon from "@/assets/images/Info.svg";
import {hidden} from "colorette";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  console.log('label : ', label, 'value : ', value);
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label==="테스트" ? (<></>) : (
            <InfoIcon />
        )}
        <Text style={label==="테스트" ? styles.label_hidden :  styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: 152,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    color: "#1E1E1E",
    marginLeft: 8,
  },
  label_hidden: {
    display: "none"
  },
  value: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    color: "#757575",
    marginLeft: 0,
  },
});

export default InfoItem;
