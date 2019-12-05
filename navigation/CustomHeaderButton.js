import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import React from "react";
import { colors } from "../shared/color";

const CustomHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={24}
    color={colors.white}
  />
);

export default CustomHeaderButton;
