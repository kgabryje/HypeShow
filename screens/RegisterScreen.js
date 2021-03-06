import React, { useRef, useState, useEffect } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generalStyles, formStyle } from "../shared/styles";
import * as Texts from "../shared/text";
import registerState, {
  isRegistrationInvalid,
  validateEmail,
  validatePassword,
  validateLastName,
  validateFirstName,
} from "../components/registerValidators";
import BG from "../assets/bg.png";
import Layout from "../components/layout";
import * as actions from "../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export const RegisterScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.authData.loading);

  useEffect(() => {
    validatePassword(password);
    setIsValid(true);
  }, [password]);

  useEffect(() => {
    validateEmail(email);
    setIsValid(true);
  }, [email]);

  useEffect(() => {
    validateFirstName(firstName);
    setIsValid(true);
  }, [firstName]);

  useEffect(() => {
    validateLastName(lastName);
    setIsValid(true);
  }, [lastName]);

  const registerHandler = () => {
    if (isRegistrationInvalid(email, password, firstName, lastName)) {
      setIsValid(false);
    } else {
      dispatch(actions.registerStarted(email, password, firstName, lastName));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={generalStyles.center}>
      <Layout>
        <ImageBackground source={BG} style={generalStyles.fullScreenCenter}>
          <View style={formStyle.container}>
            <TextInput
              style={formStyle.input}
              placeholder={Texts.auth.firstName}
              placeholderTextColor="rgba(255,255,255,0.7)"
              onSubmitEditing={() => lastNameInput.current.focus()}
              autoCapitalize={"sentences"}
              autoCompleteType={"username"}
              blurOnSubmit={true}
              value={firstName}
              onChangeText={source => setFirstName(source)}
            />
            {registerState.firstName.error ? (
              <Text style={formStyle.error}>
                {registerState.firstName.message}
              </Text>
            ) : null}

            <TextInput
              style={formStyle.input}
              placeholder={Texts.auth.lastName}
              placeholderTextColor="rgba(255,255,255,0.7)"
              onSubmitEditing={() => emailInput.current.focus()}
              autoCapitalize={"sentences"}
              autoCompleteType={"username"}
              blurOnSubmit={true}
              value={lastName}
              onChangeText={email => setLastName(email)}
            />
            {registerState.lastName.error ? (
              <Text style={formStyle.error}>
                {registerState.lastName.message}
              </Text>
            ) : null}

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
            {registerState.email.error ? (
              <Text style={formStyle.error}>{registerState.email.message}</Text>
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
            {registerState.password.error ? (
              <Text style={formStyle.error}>
                {registerState.password.message}
              </Text>
            ) : null}

            <TouchableOpacity
              style={
                isValid
                  ? formStyle.buttonContainer
                  : formStyle.buttonContainerError
              }
              onPress={registerHandler}
              disabled={loading}
            >
              <Text
                style={
                  isValid ? formStyle.buttonText : formStyle.buttonTextError
                }
              >
                {Texts.auth.register.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Layout>
    </KeyboardAvoidingView>
  );
};
