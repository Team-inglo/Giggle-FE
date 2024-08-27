import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type Step = {
  label: string;
  status: "completed" | "current" | "upcoming";
};

type ProgressTrackerProps = {
  steps: Step[];
  date?: string;
  currentMessage?: string;
  isComplete?: boolean;
};

export const ProgressBar = ({ steps }: ProgressTrackerProps) => {
  return (
    <View>
      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <View style={styles.stepLabel}>
              <Text key={index} style={styles.stepLabelText}>
                {step.label}
              </Text>
              <View
                style={[
                  styles.step,
                  {
                    backgroundColor:
                      step.status === "completed" ? "#FFA500" : "#D3D3D3",
                  },
                ]}
              >
                {step.status === "current" && (
                  <View style={styles.currentStep} />
                )}
              </View>
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor:
                      step.status === "completed" ? "#FFA500" : "#D3D3D3",
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const ProgressCard = ({
  steps,
  date,
  currentMessage,
  isComplete,
}: ProgressTrackerProps) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/document/documentDetail",
          params: {
            data: JSON.stringify({
              steps: steps,
              date: date,
              currentMessage: currentMessage,
              isComplete: isComplete,
            }),
          },
        })
      }
    >
      <Text style={styles.title}>파리바게트</Text>
      <Text style={styles.dateTitle}>신청일</Text>
      <Text style={styles.date}>{date}</Text>
      <ProgressBar steps={steps} />
      <Text
        style={
          isComplete ? styles.currentMessage : styles.currentMessageProgressing
        }
      >
        {currentMessage}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#f2f2f2",
    borderWidth: 2,
    width: "100%",
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
    padding: 20,
  },
  dateTitle: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#aaa",
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  step: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  currentStep: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFA500",
  },
  connector: {
    marginTop: 30,
    flex: 3,
    height: 6,
  },
  stepLabel: {
    flex: 1,
    width: 20,
    height: 50,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabelText: {
    fontSize: 12,
    width: 55,
    height: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  currentMessage: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 16,
    fontWeight: "500",
    padding: 20,
  },
  currentMessageProgressing: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 16,
    fontWeight: "500",
    padding: 20,
    color: "#b3261e",
  },
});

export default ProgressCard;
