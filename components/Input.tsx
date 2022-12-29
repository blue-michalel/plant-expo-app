import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Block } from "./Block";
import { Button } from "./Button";
import { Typography } from "./Text";

import * as theme from "constants/theme";

const Labels = (props: {
  label: InputProps["label"];
  error: InputProps["error"];
}) => {
  const { error, label } = props;

  return (
    <Block flex={false}>
      {label ? (
        <Typography gray2={!error} accent={error}>
          {label}
        </Typography>
      ) : undefined}
    </Block>
  );
};

const Toggle = ({
  isSecure,
  setIsSecure,
}: {
  setIsSecure: (isSecure: boolean) => void;
  isSecure: boolean | undefined;
}) => {
  if (isSecure === undefined) {
    return null;
  }

  return (
    <Button style={styles.toggle} onPress={() => setIsSecure(!isSecure)}>
      <Ionicons
        color={theme.colors.gray}
        size={theme.sizes.font * 1.35}
        style={styles.icon}
        name={!isSecure ? "md-eye" : "md-eye-off"}
      />
    </Button>
  );
};

export const Input = (props: InputProps) => {
  const {
    email,
    phone,
    number,
    secure,
    error,
    style,
    label,
    ...restProps
  } = props;

  const [isSecure, setIsSecure] = useState(secure);

  const inputStyles = [
    styles.input,
    error && { borderColor: theme.colors.accent },
    style,
  ];

  const inputType = email
    ? "email-address"
    : number
    ? "numeric"
    : phone
    ? "phone-pad"
    : "default";

  const RenderRight = () => {
    const { rightLabel, rightStyle = {}, onRightPress } = props;

    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={{ ...styles.toggle, ...rightStyle }}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  };

  return (
    <Block flex={false} margin={[theme.sizes.base, 0]}>
      <Labels error={error} label={label} />
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        {...restProps}
      />
      <Toggle isSecure={isSecure} setIsSecure={setIsSecure} />
      <RenderRight />
    </Block>
  );
};

interface InputProps extends TextInputProps {
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  secure?: boolean;
  error?: boolean;
  label: string;
  style?: TextStyle;
  rightLabel?: JSX.Element | JSX.Element[];
  rightStyle?: TextStyle;
  onRightPress?: () => void;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
  },
});
