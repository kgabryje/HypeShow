import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { generalStyles } from "../shared/styles";
import * as actions from "../store/actions/actions";

export const DiscoverScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchDiscoverReq());
  }, [dispatch]);

  const shows = useSelector(state => state.shows.discoverShows);
  return (
    <View style={generalStyles.center}>
      <Text>Discover screen</Text>
      <Button
        onPress={() => props.navigation.navigate("ShowDetails")}
        title="Show details"
      />
      {shows.map(item => (
        <View key={item.id}>
          <Text>{item.original_name}</Text>
        </View>
      ))}
    </View>
  );
};
