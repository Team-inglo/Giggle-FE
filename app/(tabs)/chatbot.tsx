import MapWebView from "@/components/extraInfo/MapWebView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const WebViewChatbotPage = () => {
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url: string }>();
  return (
    <>
      <MapWebView url={url}/>
    </>
  );
};

export default WebViewChatbotPage;

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
