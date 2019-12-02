import React from "react";
import { View, Button, Platform } from "react-native";
import {
  SafeAreaView,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "react-navigation-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./CustomHeaderButton";
import {
  LoginScreen,
  RegisterScreen,
  DiscoverScreen,
  FavouritesScreen,
  ShowEpisodesScreen,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";

const ICONS = {
  contact: Platform.OS === "android" ? "md-contact" : "ios-contact",
  create: Platform.OS === "android" ? "md-create" : "ios-create",
  menu: Platform.OS === "android" ? "md-menu" : "ios-menu",
  star: Platform.OS === "android" ? "md-star" : "ios-star",
  tv: Platform.OS === "android" ? "md-tv" : "ios-tv",
};

const defaultTabBarConfig = {
  tabBarComponent: props => (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  ),
  tabBarPosition: "bottom",
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
};

const DrawerMenuButton = ({ navData }) => (
  <HeaderButtons title="Drawer toggle" HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName={ICONS.menu}
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

const AuthNavigator = createMaterialTopTabNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: "Login",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.contact} size={20} color={"black"} />;
        },
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: "Register",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.create} size={20} color={"black"} />;
        },
      },
    },
  },
  defaultTabBarConfig
);

const ShowsTabNavigator = createMaterialTopTabNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        tabBarLabel: "Discover",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.tv} size={20} color={"black"} />;
        },
      },
    },
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: {
        tabBarLabel: "Favourites",
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.star} size={20} color={"black"} />;
        },
      },
    },
  },
  defaultTabBarConfig
);

const ShowsNavigator = createStackNavigator(
  {
    Shows: {
      screen: ShowsTabNavigator,
      navigationOptions: nav => ({
        headerLeft: <DrawerMenuButton navData={nav} />,
      }),
    },
    ShowDetails: {
      screen: ShowEpisodesScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: () => <Ionicons name={ICONS.tv} size={20} color={"black"} />,
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Shows: ShowsNavigator,
  },
  {
    contentComponent: props => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <DrawerItems {...props} />
        <Button
          title="Logout"
          onPress={() => {
            props.navigation.navigate("Auth");
          }}
        />
      </SafeAreaView>
    ),
  }
);

const RootNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator,
});

export const Layout = createAppContainer(RootNavigator);
