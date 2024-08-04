import { Pressable, StyleSheet, Text, View } from "react-native";

const ToSignUpPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.keyword}>Giggle</Text>이 처음이신가요?
      </Text>
      <Pressable style={styles.toSignUpContainer}>
        <Text style={styles.toSignUpButton}>가입하기</Text>
      </Pressable>
    </View>
  );
};

export default ToSignUpPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    gap: 8,
  },
  text: {
    color: "black",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  toSignUpContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
  },
  toSignUpButton: {
    color: "#AAAAAA",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});
