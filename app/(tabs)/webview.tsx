import MapWebView from "@/components/extraInfo/MapWebView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const WebViewPage = () => {
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url: string }>();
  return (
    <>
      <View style={styles.background}>
        <MapWebView url={url} />
      </View>
    </>
  );
};

export default WebViewPage;

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
