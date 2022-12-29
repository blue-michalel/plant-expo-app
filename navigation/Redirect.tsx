import React, { useEffect } from "react";
import { AUTHENTICATION_DATA } from "constants/keys";
import { DeviceStorage } from "utils";
import { Text } from "react-native";

const AuthLoadingScreen = ({ navigation }: NavigatorProps) => {
  // TODO check with backend API
  const getAuthData = async () => {
    const authData = await DeviceStorage.getData(AUTHENTICATION_DATA);
    console.log("authData", authData);

    const destination = authData ? "App" : "Welcome";
    navigation.navigate(destination);
  };

  useEffect(() => {
    getAuthData();
  });

  return <Text>loading</Text>;
};

export default AuthLoadingScreen;
