import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  info: string;
  onChangeText: (text: string) => void;
  inValid: boolean;
  text: string;
  placeholder: string;
  children?: React.ReactNode;
  isVisible?: boolean;
}

const Input = ({
  info,
  onChangeText,
  inValid,
  text,
  placeholder,
  children,
  isVisible,
}: Props) => {
  return (
    <>
      <View style={styles.inputBlock}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={info}
            placeholder={placeholder}
            {...(isVisible !== undefined && isVisible === false ? { secureTextEntry: !isVisible} : {})}
          />
          {children && children}
        </View>
        <Text style={inValid ? styles.warning : styles.invisible}>{text}</Text>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputBlock: {
    display: "flex",
    flexDirection: "column",
    height: 76,
    gap: 8,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 4,
    color: "#383838",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  warning: {
    color: "#B3261E",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  invisible: {
    display: "none",
  },
});
