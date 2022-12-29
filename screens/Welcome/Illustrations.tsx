import React from "react";
import { Animated, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Block } from "components";
import { FlatList } from "react-native-gesture-handler";
import * as theme from "constants/theme";

const { width, height } = Dimensions.get("window");

const Illustrations = ({ illustrations }: IllustrationsProps) => {
  const scrollX = new Animated.Value(0);

  return (
    <>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMethod="auto"
            style={styles.images}
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: false },
        )}
      />
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const stepPosition = Animated.divide(scrollX, width);

          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              //@ts-ignore
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    </>
  );
};

export interface IllustrationsProps {
  illustrations: {
    id: number;
    source: ImageSourcePropType;
  }[];
}

const defaultProps: IllustrationsProps = {
  illustrations: [
    { id: 1, source: require("assets/images/illustration_1.png") },
    { id: 2, source: require("assets/images/illustration_2.png") },
    { id: 3, source: require("assets/images/illustration_3.png") },
  ],
};

Illustrations.defaultProps = defaultProps;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  images: {
    width,
    height: height / 2,
    overflow: "hidden",
  },
});

export default Illustrations;
