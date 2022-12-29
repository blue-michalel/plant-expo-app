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

export const SignUp = ({ navigation }: NavigatorProps) => {
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  const handleSignUp = () => {
    Keyboard.dismiss();
    const validated: string[] = [];
    setLoading(true);

    const { email, password, username } = credential;

    if (!email) {
      validated.push("email");
    }
    if (!username) {
      validated.push("username");
    }
    if (!password) {
      validated.push("password");
    }

    setErrors(validated);
    setLoading(false);

    if (!validated.length) {
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.signup} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Typography h1 bold>
          Sign Up
        </Typography>
        <Block middle>
          <Input
            email
            label="Email"
            error={!!hasErrors("email")}
            style={{ ...styles.input, ...hasErrors("email") }}
            defaultValue={credential.email}
            onChangeText={(email) => setCredential({ ...credential, email })}
          />
          <Input
            label="Username"
            error={!!hasErrors("username")}
            style={{ ...styles.input, ...hasErrors("username") }}
            defaultValue={credential.username}
            onChangeText={(username) =>
              setCredential({ ...credential, username })
            }
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
          <Button gradient onPress={handleSignUp}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Typography bold white center>
                Sign Up
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
  signup: {
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
