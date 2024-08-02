import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from '@/components/tutorial/BottomButton';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";

const tutorial = () => {
  const { height } = useWindowDimensions();
  const [step, setStep] = useState(0);
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>
            유학생을 <br />
            위한 <br />
            아르바이트 도움 서비스
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedView
            style={step === 0 ? styles.stepCurrent : styles.step}
            onPress={() => setStep(0)}
          />
          <ThemedView
            style={step === 1 ? styles.stepCurrent : styles.step}
            onPress={() => setStep(1)}
          />
          <ThemedView
            style={step === 2 ? styles.stepCurrent : styles.step}
            onPress={() => setStep(2)}
          />
          <ThemedView
            style={step === 3 ? styles.stepCurrent : styles.step}
            onPress={() => setStep(3)}
          />
        </ThemedView>
        <BottomButton state={step === 3 ? 'activated' : 'disabled'} text='시작하기'/>
      </ThemedView>
    </>
  );
};

export default tutorial;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: 257,
    height: 402,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 57.6,
  },
  stepContainer: {
    backgroundColor: "#ffffff",
    width: 64.93,
    height: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  stepCurrent: {
    width: 16.23,
    height: 8,
    backgroundColor: "#FFB65A",
    borderRadius: 4,
  },
  step: {
    width: 8,
    height: 8,
    backgroundColor: "#E3E1E8",
    borderRadius: 9999,
  },
});
