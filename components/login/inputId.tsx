import {StyleSheet, Text, TextInput, TextStyle, View} from "react-native";
import {ifElse} from "ansi-fragments";

interface Props {
    info: string;
    onChangeText: (text: string) => void;
    inValid: boolean;
    isNotDuplicated: boolean;
    isChecked: boolean;
    text: string;
    placeholder: string;
    children?: React.ReactNode;
    isVisible?: boolean;
}

const Input = ({
   info,
   onChangeText,
   inValid,
   isNotDuplicated,
   isChecked,
   text,
   placeholder,
   children,
   isVisible,
}: Props) => {
    let textStyle;
    if (inValid || !isNotDuplicated || !isChecked) textStyle = styles.warning;
    else if (!inValid && isNotDuplicated && isChecked) textStyle = styles.success;
    return (
        <>
            <View style={styles.inputBlock}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={info}
                        placeholder={placeholder}
                        {...(isVisible !== undefined && isVisible === false
                            ? { secureTextEntry: !isVisible }
                            : {})}
                    />
                    {children && children}
                </View>
                <Text style={textStyle}>{text}</Text>
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
        width: "100%",
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
    success: {
        color: "#90DC1E",
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
