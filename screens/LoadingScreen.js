import React, { useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Layout from "../components/layout";
import { registerForPushNotificationsAsync } from "../components/notifications";
import { useSelector } from "react-redux";

export const LoadingScreen = props => {
  const animation = useRef(null);
  const transition = useRef(null);
  const user = useSelector(state => state.authData.user);

  useEffect(() => {
    const loadData = async () => {
      await registerForPushNotificationsAsync(user);
    };

    transition.current.play();
    loadData()
      .then(() => transition.current.reset())
      .catch(error => {
        console.log(error);
        props.navigation.navigate("Auth");
      });
  }, [props.navigation, user]);

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
