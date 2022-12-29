import React from "react";
import { Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as theme from "../constants/theme";
import {
  Browse,
  Explore,
  Login,
  Products,
  Settings,
  Welcome,
  Forgot,
  SignUp,
} from "../screens";
import AuthLoadingScreen from "./Redirect";

const AppStack = createStackNavigator({
  Browse,
  Explore,
  Products,
  Settings,
});

const AuthStack = createStackNavigator({ Welcome, Login, Forgot, SignUp });

const screens = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "AuthLoading",
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: () => (
        <Image source={require("../assets/icons/back.png")} />
      ),
      headerBackTitle: undefined,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base,
      },
    },
  },
);

export const Navigation = createAppContainer(screens);
