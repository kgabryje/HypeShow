import { fireStorage, auth, google } from "../firebase";

export const register = (credentials, navigation) => {
  auth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(result => {
      console.log(result);
      navigation.navigate("Login");
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = (credentials, navigation) => {
  auth
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(result => {
      console.log(result);
      navigation.navigate("Loading");
    })
    .catch(error => {
      console.log(error);
    });
};

export const loginByGoogle = navigation => {
  auth
    .signInWithPopup(google)
    .then(result => {
      console.log(result.user);
      navigation.navigate("Loading");
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = navigation => {
  auth
    .signOut()
    .then(() => {
      navigation.navigate("Login");
    })
    .catch(error => {
      console.log(error);
    });
};
