/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  initializeAuth,
} from "firebase/auth";
import {
  IFirebaseUser,
  IFirebaseResponse,
} from "../interfaces/IAuthentication";
import firebaseConfig from "../core/constants/firebaseConfig";
import { getReactNativePersistence } from "firebase/auth";

import AsyncStorage  from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const initFirebase = () => {
    const serviceApp = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(serviceApp);
    auth.setPersistence(getReactNativePersistence(AsyncStorage));
    return auth;
  };

  const initResponse = () => {
    const fbResponse: IFirebaseResponse = {
      result: null,
      error: {
        code: "",
        message: "",
      },
    };
    return fbResponse;
  };

  // Sign out user
  const signoutUser = async () => {
    const fbResponse = initResponse();
    const auth = initFirebase();
    await signOut(auth).catch((error) => {
      console.error(error);
      fbResponse.error.code = error.errorCode;
      fbResponse.error.message = error.errorMessage;
    });
  };

  // Register user
  const signupUser = async (
    userFullName: string,
    userEmail: string,
    userPassword: string
  ) => {
    const fbResponse = initResponse();
    const auth = initFirebase();
    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        fbResponse.result = userCredential;
        // Update profile
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userFullName,
          });
        }
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.error(error);
      });

    const formattedResponse = JSON.stringify(fbResponse);
    return formattedResponse;
  };

  // Login user
  const signinUser = async (userEmailAddress: string, userPassword: string) => {
    const fbResponse = initResponse();
    const auth = initFirebase();
    await signInWithEmailAndPassword(auth, userEmailAddress, userPassword)
      .then((userCredential) => {
        fbResponse.result = userCredential;
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.error(error);
      });
    const formattedResponse = JSON.stringify(fbResponse);
    return formattedResponse;
  };

  // Get firebase user details
  const getProfile = (): IFirebaseUser | void => {
    const auth = initFirebase();
    const user = auth.currentUser;
    user?.providerData.forEach((profile) => {
      const fbProfile: IFirebaseUser = { ...profile, firebaseUID: user.uid };
      return fbProfile;
    });
  };

  return {
    signupUser,
    signinUser,
    signoutUser,
    getProfile,
  };
};
