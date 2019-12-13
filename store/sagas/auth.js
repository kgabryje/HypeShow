import { fireStore, auth } from "../../shared/firebase/firebase";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "react-native-dotenv";
import * as firebase from "firebase";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/actions";

const FIREBASE_USERS_PATH = "USERS";

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
    yield call(() =>
      fireStore
        .collection(FIREBASE_USERS_PATH)
        .doc(result.user.uid)
        .set(data)
    );
    yield put(actions.authSuccess(data));
  } catch (error) {
    yield put(actions.authFailed(error));
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

    const doc = yield call(() => docRef.get());
    if (doc.exists) {
      const lastLoginAt = Date.now();
      yield call(() =>
        docRef.set(
          {
            lastLoginAt,
          },
          { merge: true }
        )
      );

      yield put(actions.authSuccess(doc.data()));
    }
  } catch (error) {
    yield put(actions.authFailed(error));
    console.log(error);
  }
}

/*
TODO rewrite to SAGA
*/
export function* authByGoogle() {
  const result = yield call(() =>
    Google.logInAsync({
      behavior: "web",
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    })
  );

  const { type } = result;

  console.log(result);
  if (type === "success") {
    yield onSignIn(result);
  }
}

function* onSignIn(googleUser) {
  const channel = eventChannel(emitter => {
    const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
      unsubscribe();

      if (isUserEqual(googleUser, firebaseUser)) {
        emitter(actions.authFailed(error));
        console.log("User already signed-in Firebase.");
        return;
      }

      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      try {
        const { user } = googleUser;
        const result = await auth.signInWithCredential(credential);

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

        await fireStore
          .collection(FIREBASE_USERS_PATH)
          .doc(result.user.uid)
          .set(data, {
            merge: true,
          });

        emitter(actions.authSuccess(data));
      } catch (error) {
        console.log(error);
      }
    });
    return () => unsubscribe();
  });

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

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
