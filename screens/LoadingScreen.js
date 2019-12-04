import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { generalStyles } from "../shared/styles";
import LottieView from "lottie-react-native";
import { colors } from "../shared/color";

export const LoadingScreen = props => {
  const animation = useRef(null);
  const transition = useRef(null);
  const { width, height } = Dimensions.get("window");

  setTimeout(() => {
    transition.current.play();
  }, 4000);

  const navigate = () => {
    props.navigation.navigate("Main");
  };

  return (
    <View style={generalStyles.fullScreenCenter}>
      <LottieView
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: colors.obsidianTheme,
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
    </View>
  );
};
