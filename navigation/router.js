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
  LoadingScreen,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../shared/color";
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
      backgroundColor: colors.green,
    },
    labelStyle: {
      color: colors.white,
    },
    indicatorStyle: {
      backgroundColor: colors.white,
    },
    pressColor: colors.darkGreen,
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
        tabBarLabel: Texts.auth.login,
        showIcon: true,
        tabBarIcon: () => {
          return (
            <Ionicons name={ICONS.contact} size={20} color={colors.white} />
          );
        },
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: Texts.auth.register,
        showIcon: true,
        tabBarIcon: () => {
          return (
            <Ionicons name={ICONS.create} size={20} color={colors.white} />
          );
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
        tabBarLabel: Texts.home.discover,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.tv} size={20} color={colors.white} />;
        },
      },
    },
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: {
        tabBarLabel: Texts.home.favourites,
        showIcon: true,
        tabBarIcon: () => {
          return <Ionicons name={ICONS.star} size={20} color={colors.white} />;
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
        headerTransparent: true,
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
        <Ionicons name={ICONS.tv} size={20} color={colors.white} />
      ),
    },
  }
);

const LoadingNavigation = createStackNavigator(
  {
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: "none",
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Shows: ShowsNavigator,
  },
  {
    drawerBackgroundColor: colors.obsidian,
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
  Loading: LoadingNavigation,
});

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export const Layout = createAppContainer(RootNavigator);
