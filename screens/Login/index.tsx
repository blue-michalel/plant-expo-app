import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import * as theme from "constants/theme";
import { Block, Typography, Input, Button } from "components";
import { DeviceStorage } from "utils";
import { AUTHENTICATION_DATA, authToken, deviceId } from "constants/keys";

const VALID_EMAIL = "user";
const VALID_PASSWORD = "123";

export const Login = (props: NavigatorProps) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  const handleLoading = () => {
    Keyboard.dismiss();
    const validated: string[] = [];
    setLoading(true);

    const { email, password } = credential;

    // TODO check with backend API
    if (email !== VALID_EMAIL) {
      validated.push("email");
    }
    if (password !== VALID_PASSWORD) {
      validated.push("password");
    }

    setLoading(false);

    if (!validated.length) {
      DeviceStorage.saveData(
        AUTHENTICATION_DATA,
        JSON.stringify({ authToken, deviceId }),
      );
      navigation.navigate("Browse");
    }
    setErrors(validated);
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Typography h1 bold>
          Login
        </Typography>
        <Block middle>
          <Input
            label="Email"
            style={{ ...styles.input, ...hasErrors("email") }}
            defaultValue={credential.email}
            onChangeText={(email) => setCredential({ ...credential, email })}
          />
          <Input
            secure
            label="Password"
            error={!!hasErrors("password")}
            style={{ ...styles.input, ...hasErrors("password") }}
            defaultValue={credential.password}
            onChangeText={(password) =>
              setCredential({ ...credential, password })
            }
          />
          <Button gradient onPress={handleLoading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Typography bold white center>
                Login
              </Typography>
            )}
          </Button>
          <Button onPress={() => navigation.navigate("Forgot")}>
            <Typography
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Forgot your password?
            </Typography>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
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
  empty: {},
});
