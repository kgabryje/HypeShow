import React from "react";
import { RootNavigator } from "./navigation/router";
import { createAppContainer } from "react-navigation";

const Layout = createAppContainer(RootNavigator);
export default function App() {
  return <Layout />;
}
