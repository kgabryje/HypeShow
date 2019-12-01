import React, { useEffect } from "react";
import { RootNavigator } from "./components/router";
import { createAppContainer } from "react-navigation";
import { StatusBar } from "react-native";

const Layout = createAppContainer(RootNavigator);
export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  return <Layout />;
}
