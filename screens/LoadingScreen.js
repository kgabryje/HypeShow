import React, { useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Layout from "../components/layout";

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
    <Layout>
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
    </Layout>
  );
};
