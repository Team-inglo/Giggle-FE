import { CarouselItem } from "@/app/(tabs)/tutorial";
import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
  Image,
} from "react-native";

const { width: windowWidth } = Dimensions.get("window");

interface CarouselProps {
  data: CarouselItem[];
  step: number;
  onSlide: (nextStep: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ data, step, onSlide }) => {
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / windowWidth);
    onSlide(index);
  };

  const renderCarouselItem = (item: CarouselItem) => {
    if (item.id === 1) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      );
    }
    return (
      <>
        <View style={styles.imgContainer}>
          <Image />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>{item.keyword}</Text>
            {item.title}
          </Text>
          <Text>{item.description && item.description}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.slide}>{renderCarouselItem(item)}</View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === step ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1.5,
    backgroundColor: "#FFB65A",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    paddingTop: 43,
  },
  container: {
    flex: 4,
  },
  title: {
    color: "black",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 57.6,
  },
  slide: {
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E3E1E8",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 16,
    backgroundColor: "#FFB65A",
    borderRadius: 4,
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: 257,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 1,
    flexWrap: "wrap",
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
    marginBottom: 12,
  },
  description: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 28.8,
  },
});

export default Carousel;
