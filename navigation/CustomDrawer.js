import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/actions";
import { SafeAreaView } from "react-navigation";
import { DrawerItems } from "react-navigation-drawer";
import { Button, StyleSheet } from "react-native";

const CustomDrawer = props => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      forceInset={{ top: "always", horizontal: "never" }}
      style={styles.drawer}
    >
      <DrawerItems {...props} />
      <Button
        title="Logout"
        onPress={() => {
          dispatch(actions.logout());
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default CustomDrawer;
