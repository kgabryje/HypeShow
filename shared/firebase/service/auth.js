import { fireStore, auth } from "../firebase";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "react-native-dotenv";
import * as firebase from "firebase";
import { call, put } from "redux-saga/effects";
import * as actions from "../../../store/actions/actions";

const FIREBASE_USERS_PATH = "USERS";

export const checkIfLoggedIn = navigation => {
  auth.onAuthStateChanged(user => {
    if (user) {
      navigation.navigate("Loading");
    } else {
      navigation.navigate("Auth");
    }
  });
};

export function* register(action) {
  const { email, password, firstName, lastName } = action;

  try {
    const result = yield call(() =>
      auth.createUserWithEmailAndPassword(email, password)
    );
    const createdAt = Date.now();
    const photoUrl = null;
    const emailVerified = false;
    const phoneNumber = null;
    console.log(result);
    fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(result.user.uid)
      .set({
        email,
        firstName,
        lastName,
        createdAt,
        photoUrl,
        phoneNumber,
        emailVerified,
      })
      .then(() => {
        put(
          actions.registerSuccess({
            email,
            firstName,
            lastName,
            phoneNumber,
            photoUrl,
          })
        );
      });
  } catch (error) {
    yield put(actions.registerFailed(error));
    console.log(error);
  }
}

export function* loginByPass(action) {
  const { email, password } = action.payload;
  try {
    const result = yield call(() =>
      auth.signInWithEmailAndPassword(email, password)
    );
    const lastLoginAt = Date.now();
    console.log(result);
    fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(result.user.uid)
      .set(
        {
          lastLoginAt,
        },
        { merge: true }
      )
      .then(() => {
        put(actions.loginSuccess({ email }));
      });
  } catch (error) {
    yield put(actions.loginFailed(error));
    console.log(error);
  }
}

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
            .collection(FIREBASE_USERS_PATH)
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

export function* logout() {
  try {
    yield call(() => auth.signOut());
  } catch (error) {
    console.log(error);
  }
}
