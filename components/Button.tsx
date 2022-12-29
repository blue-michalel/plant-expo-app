import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as theme from "../constants/theme";

const defaultProps: Partial<ButtonProps> = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: "white",
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    color,
    end,
    endColor,
    gradient,
    locations,
    opacity,
    shadow,
    start,
    startColor,
    style,
    ...restProps
  } = props;

  const buttonStyles: StyleProp<TextStyle> = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity}
        {...restProps}
      >
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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

interface ButtonProps extends TouchableOpacityProps {
  style: TextStyle;
  opacity: number;
  gradient: boolean;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "black"
    | "white"
    | "white"
    | "gray"
    | "gray2";
  startColor: string;
  endColor: string;
  end: { x: number; y: number };
  start: { x: number; y: number };
  locations: number[];
  shadow: boolean;
  children: JSX.Element | JSX.Element[];
}
