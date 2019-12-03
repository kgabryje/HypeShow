import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generalStyles, formStyle } from "../shared/styles";
import * as Texts from "../shared/text";

export const RegisterScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const registerHandler = () => {
    props.navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={generalStyles.center}>
      <View style={formStyle.container}>
        <TextInput
          style={formStyle.input}
          placeholder={Texts.firstName}
          placeholderTextColor="rgba(0,0,0,0.4)"
          onSubmitEditing={() => lastNameInput.current.focus()}
          autoCapitalize={"sentences"}
          autoCompleteType={"username"}
          blurOnSubmit={true}
          value={firstName}
          onChangeText={source => setFirstName(source)}
        />

        <TextInput
          style={formStyle.input}
          placeholder={Texts.lastName}
          placeholderTextColor="rgba(0,0,0,0.4)"
          onSubmitEditing={() => emailInput.current.focus()}
          autoCapitalize={"sentences"}
          autoCompleteType={"username"}
          blurOnSubmit={true}
          value={lastName}
          onChangeText={email => setLastName(email)}
        />

        <TextInput
          style={formStyle.input}
          placeholder={Texts.email}
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
          placeholder={Texts.password}
          secureTextEntry
          placeholderTextColor="rgba(0,0,0,0.4)"
          autoCapitalize="none"
          ref={passwordInput}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={formStyle.buttonContainer}
          onPress={registerHandler}
        >
          <Text style={formStyle.buttonText}>
            {Texts.register.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
