import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Block, BlockProps } from "./Block";
import * as theme from "constants/theme";

export const Card = (props: Partial<BlockProps>) => {
  const { color, style, children, ...restProps } = props;
  const cardStyles: StyleProp<TextStyle> = [styles.card, style];

  return (
    <Block color={color || "white"} style={cardStyles} {...restProps}>
      {children}
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
  },
});
