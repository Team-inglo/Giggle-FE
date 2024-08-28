import Menu from "@/components/common/Menu";
import MapWebView from "@/components/extraInfo/MapWebView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const WebViewHomePage = () => {
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url: string }>();
  return (
    <>
      <MapWebView url={url} />
      <View style={styles.container}>
        <Menu />
      </View>
    </>
  );
};

export default WebViewHomePage;

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
    width: "100%",
    display: 'flex',
    alignItems: 'center',
  },
});
