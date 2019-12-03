import React from "react";
import { Button, Platform, StyleSheet } from "react-native";
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
import {
  whiteTheme,
  greenTheme,
  darkGreenTheme,
  obsidianTheme,
} from "../shared/color";
import * as Texts from "../shared/text";

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
      backgroundColor: greenTheme,
    },
    labelStyle: {
      color: whiteTheme,
    },
    indicatorStyle: {
      backgroundColor: whiteTheme,
    },
    pressColor: darkGreenTheme,
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
        tabBarLabel: Texts.login,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.contact} size={20} color={whiteTheme} />;
        },
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: Texts.register,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.create} size={20} color={whiteTheme} />;
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
        tabBarLabel: Texts.discover,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.tv} size={20} color={whiteTheme} />;
        },
      },
    },
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: {
        tabBarLabel: Texts.favourites,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.star} size={20} color={whiteTheme} />;
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
      drawerIcon: () => (
        <Ionicons name={ICONS.tv} size={20} color={whiteTheme} />
      ),
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Shows: ShowsNavigator,
  },
  {
    drawerBackgroundColor: obsidianTheme,
    contentComponent: props => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.drawer}
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

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export const Layout = createAppContainer(RootNavigator);
