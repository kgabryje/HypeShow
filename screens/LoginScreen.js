import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { generalStyles, formStyle } from "../shared/styles";
import * as Texts from "../shared/text";
import loginState, {
  validateEmail,
  isLoginInvalid,
  validatePassword,
} from "../components/loginValidators";
import BG from "../assets/bg.png";
import Layout from "../components/layout";

export const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const passwordInput = useRef(null);

  useEffect(() => {
    validateEmail(email);
    setIsValid(true);
  }, [email]);

  useEffect(() => {
    validatePassword(password);
    setIsValid(true);
  }, [password]);

  const authHandler = () => {
    validateEmail(email);
    validatePassword(password);
    if (isLoginInvalid()) {
      setIsValid(false);
    } else {
      props.navigation.navigate("Loading");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={generalStyles.center}>
      <Layout>
        <ImageBackground source={BG} style={generalStyles.fullScreenCenter}>
          <View style={formStyle.container}>
            <TextInput
              style={formStyle.input}
              placeholder={Texts.auth.email}
              placeholderTextColor="rgba(255,255,255,0.7)"
              onSubmitEditing={() => passwordInput.current.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType={"email"}
              blurOnSubmit={true}
              value={email}
              onChangeText={email => setEmail(email)}
            />
            {loginState.email.error ? (
              <Text style={formStyle.error}>{loginState.email.message}</Text>
            ) : null}

            <TextInput
              style={formStyle.input}
              placeholder={Texts.auth.password}
              secureTextEntry
              placeholderTextColor="rgba(255,255,255,0.7)"
              autoCapitalize="none"
              ref={passwordInput}
              value={password}
              onChangeText={password => setPassword(password)}
            />
            {loginState.password.error ? (
              <Text style={formStyle.error}>{loginState.password.message}</Text>
            ) : null}

            <TouchableOpacity
              style={
                isValid
                  ? formStyle.buttonContainer
                  : formStyle.buttonContainerError
              }
              onPress={authHandler}
            >
              <Text
                style={
                  isValid ? formStyle.buttonText : formStyle.buttonTextError
                }
              >
                {Texts.auth.login.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Layout>
    </KeyboardAvoidingView>
  );
};
