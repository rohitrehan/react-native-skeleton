/* eslint-disable @typescript-eslint/no-explicit-any */
import firebaseConfig from '../core/constants/firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IFirebaseResponse,
  IFirebaseUser,
} from '../interfaces/IAuthentication';
import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebaseAuth from '@react-native-firebase/auth';

export type IFirebaseConfirmationResponse = Omit<
  IFirebaseResponse,
  'result'
> & {
  result?: FirebaseAuthTypes.ConfirmationResult | null;
};
export const useAuth = () => {
  const initFirebase = async () => {
    firebase.setReactNativeAsyncStorage(AsyncStorage);
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // Initialize Firebase Authentication and get a reference to the service
    // const auth = getAuth(serviceApp);
    // auth.setPersistence(getReactNativePersistence(AsyncStorage));
    return firebaseAuth();
  };

  const initResponse = () => {
    const fbResponse: IFirebaseResponse = {
      result: null,
      error: {
        code: '',
        message: '',
      },
    };
    return fbResponse;
  };

  // Sign out user
  const signoutUser = async () => {
    const fbResponse = initResponse();
    const auth = await initFirebase();
    auth.signOut().catch((error) => {
      console.error(error);
      fbResponse.error.code = error.errorCode;
      fbResponse.error.message = error.errorMessage;
    });
  };

  // Register user
  const signupEmailUser = async (
    userFullName: string,
    userEmail: string,
    userPassword: string,
  ): Promise<IFirebaseResponse> => {
    const fbResponse = initResponse();
    const auth = await initFirebase();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        userEmail,
        userPassword,
      );
      fbResponse.result = userCredential;
      if (auth.currentUser) {
        await auth.currentUser.updateProfile({
          displayName: userFullName,
        });
      }
    } catch (error: any) {
      fbResponse.error.code = error.code;
      fbResponse.error.message = error.message;
      console.error(error);
    }

    return fbResponse;
  };

  // Login user with email
  const signinEmailUser = async (
    userEmailAddress: string,
    userPassword: string,
  ): Promise<IFirebaseResponse> => {
    const fbResponse = initResponse();
    const auth = await initFirebase();
    await auth
      .signInWithEmailAndPassword(userEmailAddress, userPassword)
      .then((userCredential) => {
        fbResponse.result = userCredential;
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.error(error);
      });
    return fbResponse;
  };

  // Login user with phone
  const signinPhoneUser = async (
    userPhoneNumber: string,
  ): Promise<IFirebaseConfirmationResponse> => {
    console.log(userPhoneNumber);
    const fbResponse: IFirebaseConfirmationResponse = {
      result: null,
      error: {
        code: '',
        message: '',
      },
    };

    const auth = await initFirebase();
    await auth
      .signInWithPhoneNumber(userPhoneNumber)
      .then((confirmation) => {
        fbResponse.result = confirmation;
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.error(error);
      });
    return fbResponse;
  };

  // Get firebase user details
  const getProfile = async (): Promise<IFirebaseUser | void> => {
    const auth = await initFirebase();
    const user = auth.currentUser;
    console.log(user);

    const fbProfile: IFirebaseUser = {
      firebaseUID: null,
      providerId: '',
      uid: '',
      displayName: undefined,
      email: undefined,
      phoneNumber: undefined,
      photoURL: undefined,
      tenantId: undefined,
    };
    user?.providerData.forEach((profile) => {
      fbProfile.firebaseUID = user.uid;
      fbProfile.providerId = profile.providerId;
      fbProfile.uid = profile.uid;
      fbProfile.displayName = profile.displayName ?? fbProfile.displayName;
      fbProfile.email = profile.email ?? fbProfile.email;
      fbProfile.phoneNumber = profile.phoneNumber ?? fbProfile.phoneNumber;
      fbProfile.photoURL = profile.photoURL ?? fbProfile.photoURL;
      fbProfile.tenantId = profile.tenantId ?? fbProfile.tenantId;
    });
    return fbProfile;
  };

  return {
    signinPhoneUser,
    signupEmailUser,
    signinEmailUser,
    signoutUser,
    getProfile,
  };
};
