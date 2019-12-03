import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import React from "react";
import { whiteTheme } from "../shared/color";

const CustomHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={24}
    color={whiteTheme}
  />
);

export default CustomHeaderButton;
