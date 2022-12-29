import React from "react";
import { Switch, Platform, SwitchProps } from "react-native";
import * as theme from "constants/theme";

const GRAY_COLOR = "rgba(168, 182, 200, 0.30)";

const SwitchInput = (props: SwitchInputProps) => {
  const { value, ...restProps } = props;
  let thumbColor;

  if (Platform.OS === "android") {
    thumbColor = GRAY_COLOR;
    if (props.value) {
      thumbColor = theme.colors.secondary;
    }
  }

  return (
    <Switch
      thumbColor={thumbColor}
      ios_backgroundColor={GRAY_COLOR}
      trackColor={{
        true: theme.colors.secondary,
        false: GRAY_COLOR,
      }}
      value={value}
      {...restProps}
    />
  );
};

interface SwitchInputProps extends SwitchProps {
  value: boolean;
}

export { SwitchInput as Switch };
