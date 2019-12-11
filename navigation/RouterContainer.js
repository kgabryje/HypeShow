import React, { useEffect, useRef } from "react";
import { Router } from "./router";
import { NavigationActions } from "react-navigation";
import { auth } from "../shared/firebase/firebase";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/actions";

export const RouterContainer = () => {
  const navRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const targetRoute = !!user ? "Loading" : "Auth";
      if (!!user) {
        // TODO: verify what parts of user object are needed
        dispatch(actions.loginSuccess(user));
      }
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: targetRoute })
      );
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <Router ref={navRef} />;
};
