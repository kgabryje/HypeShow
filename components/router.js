import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createMaterialTopTabNavigator(
  {
    loginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: "Login",
        showIcon: true,
        header: null,
        tabBarIcon: () => {
          return <Ionicons name="md-contact" size={20} color={"black"} />;
        },
      },
    },
    registerScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: "Register",
        showIcon: true,
        header: null,
        tabBarIcon: () => {
          return <Ionicons name="md-create" size={20} color={"black"} />;
        },
      },
    },
  },
  {
    initialRouteName: "LoginScreen",
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: "white",
      },
      labelStyle: {
        color: "black",
      },
      indicatorStyle: {
        backgroundColor: "black",
      },
      pressColor: "red",
    },
  }
);
export const RootNavigator = createStackNavigator(
  {
    initialPage: TabNavigator,
  },
  {
    initialRouteName: "initialPage",
    mode: "modal",
    headerMode: "none",
  }
);
