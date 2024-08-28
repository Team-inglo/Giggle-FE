import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const MapWebView = () => {
  const webViewRef = useRef(null);

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.container}
        source={{ uri: "https://giggle-fe.vercel.app/employer-registration" }}
        scalesPageToFit={false}
        maximumZoomScale={0.8}
        minimumZoomScale={0.8}
      />
    </View>
  );
};

export default MapWebView;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    width: "100%",
    height: 100,
    marginTop: 24,
  },
  webView: {
    flex: 1,
    width: "100%",
  },
});
