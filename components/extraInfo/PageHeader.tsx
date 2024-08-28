import React from "react";
import PrevButton from "../common/PrevButton";
import { StyleSheet, Text, View } from "react-native";

interface PageHeaderProps {
  currentPage: number;
  allPage: number;
  keyword: string;
  title: string;
  description?: string;
}

const PageHeader = ({
  currentPage,
  allPage,
  keyword,
  title,
  description,
}: PageHeaderProps) => {
  return (
    <>
      <PrevButton isLogo={false} />
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>
          <Text style={styles.allPage}>
            <Text style={styles.currentPage}>{currentPage}</Text>/{allPage}
            {"\n"}
          </Text>
          <Text style={styles.keyword}>{keyword}</Text>
          {title}
        </Text>
        <Text style={styles.description}>{description && description}</Text>
      </View>
    </>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    display: "flex",
    backgroundColor: "white",
    width: 257,
    height: 120,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 57.6,
  },
  allPage: {
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
  },
  currentPage: {
    color: "#AAAAAA",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  description: {
    color: "rgba(60, 60, 67, 0.60)",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
  },
});
