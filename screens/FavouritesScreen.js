import React from "react";
import { View, Text, Button } from "react-native";
import Layout from "../components/layout";

export const FavouritesScreen = props => (
  <Layout>
    <Text>Favourites screen</Text>
    <Button
      onPress={() => props.navigation.navigate("ShowDetails")}
      title="Show details"
    />
  </Layout>
);
