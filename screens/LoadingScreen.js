import React, { useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { generalStyles } from "../shared/styles";
import LottieView from "lottie-react-native";
import { colors } from "../shared/color";
import { LinearGradient } from "expo-linear-gradient";

export const LoadingScreen = props => {
  const animation = useRef(null);
  const transition = useRef(null);
  const { width, height } = Dimensions.get("window");

  setTimeout(() => {
    transition.current.play();
  }, 6000);

  const navigate = () => {
    props.navigation.navigate("Main");
  };

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
          backgroundColor: "transparent",
        }}
        source={require("../assets/loading")}
        loop
        autoPlay
      />
      <LottieView
        ref={transition}
        style={{
          transform: [
            {
              scaleX: 1.2,
            },
            {
              scaleY: 1.5,
            },
          ],
          ...StyleSheet.absoluteFill,
          backgroundColor: "transparent",
        }}
        loop={false}
        source={require("../assets/transition")}
        onAnimationFinish={navigate}
      />
    </LinearGradient>
  );
};
