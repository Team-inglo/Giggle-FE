import MapWebView from "@/components/extraInfo/MapWebView";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const SignUpPage = () => {
  const router = useRouter();
  return (
    <>
      <MapWebView />
    </>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  container: {
    flex: 1,
    width: "100%",
    height: 400,
  },
});
