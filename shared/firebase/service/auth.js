import { fireStore, auth } from "../firebase";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "react-native-dotenv";
import * as firebase from "firebase";
import { call, put } from "redux-saga/effects";
import * as actions from "../../../store/actions/actions";

const FIREBASE_USERS_PATH = "USERS";

export const checkIfLoggedIn = navigation => {
  //TODO rewrite to SAGA
  auth.onAuthStateChanged(user => {
    if (user) {
      navigation.navigate("Loading");
    } else {
      navigation.navigate("Auth");
    }
  });
};

export function* register(action) {
  const { email, password, firstName, lastName } = action.payload;

  try {
    const result = yield call(() =>
      auth.createUserWithEmailAndPassword(email, password)
    );
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      createdAt: Date.now(),
      photoUrl: null,
      phoneNumber: null,
      emailVerified: false,
    };
    fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(result.user.uid)
      .set(data)
      .then(() => {
        put(actions.registerSuccess(data));
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

    const docRef = fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(result.user.uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const lastLoginAt = Date.now();
        docRef
          .set(
            {
              lastLoginAt,
            },
            { merge: true }
          )
          .then(() => {
            put(actions.loginSuccess(doc.data()));
          });
      }
    });
  } catch (error) {
    yield put(actions.loginFailed(error));
    console.log(error);
  }
}

export const loginByGoogle = async () => {
  //TODO rewrite to SAGA
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
          const { photoURL, emailVerified, phoneNumber, email } = result.user;

          const data = {
            email: email,
            firstName: user.givenName,
            lastName: user.familyName,
            lastLoginAt: Date.now(),
            photoURL: photoURL,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
          };

          fireStore
            .collection(FIREBASE_USERS_PATH)
            .doc(result.user.uid)
            .set(data, { merge: true })
            .then(() => {
              actions.loginSuccess(data);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      actions.loginFailed(error);
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
