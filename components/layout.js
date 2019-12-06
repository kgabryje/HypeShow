import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../shared/color";
import { generalStyles } from "../shared/styles";

const Layout = props => {
  return (
    <LinearGradient
      colors={[colors.blue, colors.lightGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.2, 1.0]}
      style={generalStyles.fullScreenCenter}
    >
      {props.children}
    </LinearGradient>
  );
};

export default Layout;
