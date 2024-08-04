import React, { Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckIcon from "@/assets/images/Check.svg";
import ChecklistItem from "./CheckListItem";

interface AgreeItemsProps {
  checkedEach: Array<boolean>;
  setCheckedEach: Dispatch<SetStateAction<boolean[]>>;
}

const AgreeTerms: React.FC<AgreeItemsProps> = ({
  checkedEach,
  setCheckedEach,
}) => {
  const checkedAll = !checkedEach.includes(false);
  const handleCheck = (index: number) => {
    const newCheckedEach = [...checkedEach];
    newCheckedEach[index] = !newCheckedEach[index];
    setCheckedEach(newCheckedEach);
  };
  const handleCheckedAll = () => {
    const newCheckedEach = checkedEach.map((elem: boolean) => !elem);
    setCheckedEach(newCheckedEach);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          checkedAll
            ? styles.mainItemContainerChecked
            : styles.mainItemContainer
        }
        onPress={handleCheckedAll}
      >
        <CheckIcon stroke={checkedAll ? "white" : "#AAAAAA"} />
        <Text style={checkedAll ? styles.mainTextChecked : styles.mainText}>
          서비스 이용약관 전체 동의
        </Text>
      </TouchableOpacity>
      <ChecklistItem
        key={0}
        title="Giggle 서비스 이용약관(필수)"
        checked={checkedEach[0]}
        onPress={() => handleCheck(0)}
        hasSubItems
      />
      <ChecklistItem
        key={1}
        title="Giggle 개인정보 수집 동의(필수)"
        checked={checkedEach[1]}
        onPress={() => handleCheck(1)}
        hasSubItems
      />
      <ChecklistItem
        key={2}
        title="Giggle 위치정보 수집 동의(필수)"
        checked={checkedEach[2]}
        onPress={() => handleCheck(2)}
        hasSubItems
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  mainItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 8,
    paddingHorizontal: 55,
    paddingVertical: 20,
  },
  mainItemContainerChecked: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFB65A",
    backgroundColor: "#FFB65A",
    borderRadius: 8,
    paddingHorizontal: 55,
    paddingVertical: 20,
  },
  mainText: {
    color: "#AAAAAA",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 22.4,
  },
  mainTextChecked: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 22.4,
  },
  titleText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Noto Sans",
    fontWeight: "700",
    lineHeight: 30,
  },
});

export default AgreeTerms;
