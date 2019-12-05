import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generalStyles, formStyle } from "../shared/styles";
import * as Texts from "../shared/text";
import loginState, {
  validateEmail,
  isLoginInvalid,
  validatePassword,
} from "../components/loginValidators";

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
      <View style={formStyle.container}>
        <TextInput
          style={formStyle.input}
          placeholder={Texts.auth.email}
          placeholderTextColor="rgba(0,0,0,0.4)"
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
          placeholderTextColor="rgba(0,0,0,0.4)"
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
            isValid ? formStyle.buttonContainer : formStyle.buttonContainerError
          }
          onPress={authHandler}
        >
          <Text style={formStyle.buttonText}>
            {Texts.auth.login.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
