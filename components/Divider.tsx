import React from "react";
import { StyleSheet } from "react-native";

import { Block, BlockProps } from "./Block";
import * as theme from "constants/theme";

export const Divider = (props: Partial<BlockProps>) => {
  const { color, style, ...restProps } = props;
  const dividerStyles = [styles.divider, style];

  return (
    <Block color={color || "gray2"} style={dividerStyles} {...restProps} />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
