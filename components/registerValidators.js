import React, { useRef, useState } from "react";
import { emailRegex } from "../shared/constants.js";

const registerState = {
  firstName: {
    error: false,
    message: ""
  },
  lastName: {
    error: false,
    message: ""
  },
  email: {
    error: false,
    message: ""
  },
  password: {
    error: false,
    message: ""
  }
};

export const isRegistrationInvalid = () => {
  return (
    registerState.password.error ||
    registerState.email.error ||
    registerState.firstName.error ||
    registerState.lastName.error
  );
};

export const validatePassword = password => {
  if (password && password.length >= 6) {
    registerState.password.error = false;
    registerState.password.message = "";
  } else {
    registerState.password.error = true;
    registerState.password.message = "Password should have at least 6 signs";
  }
};

export const validateEmail = email => {
  if (email && emailRegex.test(email)) {
    registerState.email.error = false;
    registerState.email.message = "";
  } else {
    registerState.email.error = true;
    registerState.email.message = "It is not valid email";
  }
};

export const validateFirstName = firstName => {
  if (firstName && firstName.length >= 2) {
    registerState.firstName.error = false;
    registerState.firstName.message = "";
  } else {
    registerState.firstName.error = true;
    registerState.firstName.message = "First name should have at least 2 signs";
  }
};

export const validateLastName = lastName => {
  if (lastName && lastName.length >= 2) {
    registerState.lastName.error = false;
    registerState.lastName.message = "";
  } else {
    registerState.lastName.error = true;
    registerState.lastName.message = "Last name should have at least 2 signs";
  }
};

export default registerState;
