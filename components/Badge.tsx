import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Block, BlockProps } from "./Block";
import * as theme from "constants/theme";

export const Badge = (props: BadgeProps) => {
  const { children, style, size, color, ...restProps } = props;

  const badgeStyles: StyleProp<TextStyle> = [
    styles.badge,
    !!size && {
      height: size,
      width: size,
      borderRadius: size,
    },
    style,
  ];

  return (
    <Block
      flex={false}
      middle
      center
      color={color}
      style={badgeStyles}
      {...restProps}
    >
      {children}
    </Block>
  );
};

interface BadgeProps extends Partial<BlockProps> {
  size: number;
}

const styles = StyleSheet.create({
  badge: {
    height: theme.sizes.base,
    width: theme.sizes.base,
    borderRadius: theme.sizes.border,
  },
});
