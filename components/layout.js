import React, { useRef, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../shared/color";
import { generalStyles } from "../shared/styles";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

const Layout = props => {
  const animation = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [zIndex, setZIndex] = useState(-1);
  const loading = useSelector(state => state.authData.loading);

  useEffect(() => {
    if (loading) {
      animation.current.play();
      setOpacity(1);
      setZIndex(2);
    } else {
      animation.current.reset();
      setOpacity(0);
      setZIndex(-1);
    }
  }, [loading]);

  return (
    <LinearGradient
      colors={[colors.blue, colors.lightGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.2, 1.0]}
      style={generalStyles.fullScreenCenter}
    >
      <LottieView
        ref={animation}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: zIndex,
          opacity: opacity,
        }}
        source={require("../assets/loading")}
        loop
      />
      {props.children}
    </LinearGradient>
  );
};

export default Layout;
