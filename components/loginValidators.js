import React, { useRef, useState } from "react";
import { emailRegex } from "../shared/constants.js";

const loginState = {
  email: {
    error: false,
    message: "",
  },
  password: {
    error: false,
    message: "",
  },
};

export const isLoginInvalid = () => {
  return loginState.password.error || loginState.email.error;
};

export const validatePassword = password => {
  if (password && password.length >= 6) {
    loginState.password.error = false;
    loginState.password.message = "";
  } else {
    loginState.password.error = true;
    loginState.password.message = "Password should have at least 6 signs";
  }
};

export const validateEmail = email => {
  if (email && emailRegex.test(email)) {
    loginState.email.error = false;
    loginState.email.message = "";
  } else {
    loginState.email.error = true;
    loginState.email.message = "It is not valid email";
  }
};

export default loginState;
