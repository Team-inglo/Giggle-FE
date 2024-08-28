import { View, Text, StyleSheet } from "react-native";

const Divider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>또는</Text>
    <View style={styles.dividerLine} />
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  dividerText: {
    color: "black",
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: "Noto Sans",
    fontWeight: "400",
    lineHeight: 18,
  },
});

export default Divider;
