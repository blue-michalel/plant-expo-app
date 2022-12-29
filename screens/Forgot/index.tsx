import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Button, Block, Input, Typography } from "components";
import * as theme from "constants/theme";

const VALID_EMAIL = "user";

export const Forgot = ({ navigation }: NavigatorProps) => {
  const [credential, setCredential] = useState({
    email: VALID_EMAIL,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  const handleForgot = () => {
    const validated: string[] = [];
    Keyboard.dismiss();
    setLoading(true);

    // eslint-disable-next-line no-useless-escape
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(credential.email)) {
      validated.push("email");
    }
    setLoading(false);
    setErrors(validated);

    if (!validated.length) {
      Alert.alert(
        "Password sent!",
        "Please check you email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Typography h1 bold>
          Forgot
        </Typography>
        <Block middle>
          <Input
            label="Email"
            error={!!hasErrors("email")}
            style={{ ...styles.input, ...hasErrors("email") }}
            defaultValue={VALID_EMAIL}
            onChangeText={(email) => setCredential({ ...credential, email })}
          />
          <Button gradient onPress={handleForgot}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Typography bold white center>
                Forgot
              </Typography>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Login")}>
            <Typography
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Back to Login
            </Typography>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
