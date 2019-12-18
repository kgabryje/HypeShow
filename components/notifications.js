import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { fireStore } from "../shared/firebase/firebase";
import { FIREBASE_USERS_PATH } from "../shared/constants";

export const registerForPushNotificationsAsync = async currentUser => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }

  try {
    let token = await Notifications.getExpoPushTokenAsync();

    fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(currentUser.uid)
      .set({ push_token: token }, { merge: true });
  } catch (error) {
    console.log(error);
  }
};
