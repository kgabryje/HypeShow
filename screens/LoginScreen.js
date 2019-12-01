import React, { useState, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generalStyles } from "../shared/styles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef(null);

  return (
    <KeyboardAvoidingView behavior="padding" style={generalStyles.center}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="rgba(0,0,0,0.4)"
          autoCapitalize="none"
          ref={passwordInput}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.login()}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    width: "80%",
  },
  input: {
    marginTop: 15,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
    color: "black",
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "red",
    paddingVertical: 15,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    letterSpacing: 3,
  },
});
