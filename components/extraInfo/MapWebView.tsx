import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

interface WebViewProps {
  url: string;
  onMessage?: (event: WebViewMessageEvent) => void;
}

const MapWebView = ({url, onMessage}: WebViewProps) => {
  const webViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <WebView
        style={styles.container}
        source={{ uri: url }}
        scalesPageToFit={false}
        onMessage={onMessage}
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
