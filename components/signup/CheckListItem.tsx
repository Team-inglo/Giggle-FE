import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckIcon from "@/assets/images/Check.svg";
import { Ionicons } from "@expo/vector-icons";

interface ChecklistItemProps {
  title: string;
  checked: boolean;
  hasSubItems?: boolean;
  onPress?: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  hasSubItems = false,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.checkboxContainer}>
        <View
          style={
            checked === false
              ? styles.checkBoxLayout
              : styles.checkBoxLayoutChecked
          }
        >
          <CheckIcon stroke={checked === false ? "#AAAAAA" : "white"} />
        </View>
      </View>
      <Text style={styles.itemText}>{title}</Text>
      {hasSubItems && (
        <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
      )}
    </TouchableOpacity>
  );
};

export default ChecklistItem;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    marginRight: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxLayout: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: "#F2F2F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxLayoutChecked: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: "#FFB65A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
});
