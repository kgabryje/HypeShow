import React from "react";
import { SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "react-navigation-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Ionicons } from "@expo/vector-icons";

const AuthNavigator = createMaterialTopTabNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: "Login",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name="md-contact" size={20} color={"black"} />;
        },
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: "Register",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name="md-create" size={20} color={"black"} />;
        },
      },
    },
  },
  {
    initialRouteName: "Login",
    tabBarComponent: props => (
      <SafeAreaView>
        <MaterialTopTabBar {...props} />
      </SafeAreaView>
    ),
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
    Auth: AuthNavigator,
  },
  {
    initialRouteName: "Auth",
    headerMode: "none",
  }
);
