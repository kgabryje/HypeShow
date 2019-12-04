import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generalStyles, formStyle } from "../shared/styles";
import * as Texts from "../shared/text";

export const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef(null);

  const authHandler = () => {
    // code for signup/login here

    props.navigation.navigate("Main");
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
        <TouchableOpacity
          style={formStyle.buttonContainer}
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
