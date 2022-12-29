import React from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import { enableScreens } from "react-native-screens";
import * as theme from "../constants/theme";

import "react-native-gesture-handler";
enableScreens();

export const Block = (props: Partial<BlockProps>) => {
  const handleMargins = () => {
    const { margin } = props;
    if (typeof margin === "number") {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === "object") {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }

    return {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    };
  };

  const handlePaddings = () => {
    const { padding } = props;
    if (typeof padding === "number") {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === "object") {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }

    return {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    };
  };

  const {
    flex,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    card,
    shadow,
    color,
    space,
    padding,
    margin,
    animated,
    wrap,
    style,
    children,
    customColor,
    ...restProps
  } = props;

  const blockStyles: StyleProp<TextStyle> = [
    styles.block,
    !!flex && { flex },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    !!margin && { ...handleMargins() },
    !!padding && { ...handlePaddings() },
    card && styles.card,
    shadow && styles.shadow,
    space === "between" && { justifyContent: "space-between" },
    space === "around" && { justifyContent: "space-around" },
    space === "evenly" && { justifyContent: "space-evenly" },
    wrap && { flexWrap: "wrap" },
    color && styles[color], // predefined styles colors for backgroundColor
    !!customColor && { backgroundColor: customColor }, // custom backgroundColor
    style, // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...restProps}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...restProps}>
      {children}
    </View>
  );
};

export interface BlockProps extends ViewProps {
  opacity: Animated.Node<number>;
  flex: number | Animated.Value | false;
  row: boolean;
  column: boolean;
  center: boolean;
  middle: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
  card: boolean;
  shadow: boolean;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "black"
    | "white"
    | "white"
    | "gray"
    | "gray2";
  customColor: string;
  space: "between" | "around" | "evenly";
  padding: number | number[];
  margin: number | number[];
  animated: any;
  wrap: boolean;
  style: TextStyle | StyleProp<TextStyle>;
  children: JSX.Element | JSX.Element[] | null;
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  card: {
    borderRadius: theme.sizes.radius,
  },
  center: {
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
});
