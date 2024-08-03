import { Dispatch, SetStateAction, useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
  value: string;
  onClick: Dispatch<SetStateAction<string>>;
}

const LanguagePicker: React.FC<Props> = ({ value, onClick}: Props) => {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "한국어", value: "option1" },
    { label: "English", value: "option2" },
    { label: "日本語", value: "option3" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onClick}
        setItems={setItems}
        placeholder="언어 선택"
        placeholderStyle={{
          color: "#B3B3B3",
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 16,
        }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  dropdown: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9 ",
  },
  dropDownContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
});

export default LanguagePicker;
