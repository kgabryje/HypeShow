import { fireStore, auth } from "../firebase";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "react-native-dotenv";
import * as firebase from "firebase";

const USERS = "USERS";

export const checkIfLoggedIn = navigation => {
  auth.onAuthStateChanged(user => {
    if (user) {
      navigation.navigate("Loading");
    }
  });
};

export const register = credentials => {
  const { email, password, firstName, lastName } = credentials;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      const createdAt = Date.now();
      const photoUrl = null;
      const emailVerified = false;
      const phoneNumber = null;
      fireStore
        .collection(USERS)
        .doc(result.user.uid)
        .set({
          email,
          firstName,
          lastName,
          createdAt,
          photoUrl,
          phoneNumber,
          emailVerified,
        });
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = credentials => {
  const { email, password } = credentials;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const lastLoginAt = Date.now();
      fireStore
        .collection(USERS)
        .doc(result.user.uid)
        .set(
          {
            lastLoginAt,
          },
          { merge: true }
        );
    })
    .catch(error => {
      console.log(error);
    });
};

export const loginByGoogle = async () => {
  const result = await Google.logInAsync({
    behavior: "web",
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  const { type } = result;

  if (type === "success") {
    onSignIn(result);
  }
};

const onSignIn = googleUser => {
  const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
    unsubscribe();
    if (!isUserEqual(googleUser, firebaseUser)) {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      const { user } = googleUser;
      auth
        .signInWithCredential(credential)
        .then(result => {
          const lastLoginAt = Date.now();
          const { photoURL, emailVerified, phoneNumber, email } = result.user;
          const lastName = user.familyName;
          const firstName = user.givenName;
          fireStore
            .collection(USERS)
            .doc(result.user.uid)
            .set({
              email,
              firstName,
              lastName,
              lastLoginAt,
              photoURL,
              emailVerified,
              phoneNumber,
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    let providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
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
