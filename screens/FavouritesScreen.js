import React from "react";
import { View, Text, Button } from "react-native";
import { generalStyles } from "../shared/styles";

export const FavouritesScreen = props => (
  <View style={generalStyles.center}>
    <Text>Favourites screen</Text>
    <Button
      onPress={() => props.navigation.navigate("ShowDetails")}
      title="Show details"
    />
  </View>
);
