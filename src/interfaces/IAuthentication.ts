// import { User, UserCredential, UserInfo } from "firebase/auth";

import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IFirebaseResponse {
  result: FirebaseAuthTypes.UserCredential | null;
  error: {
    code: string;
    message: string;
  };
}

// extend the firebase user object
export interface IFirebaseUser extends FirebaseAuthTypes.UserInfo {
  firebaseUID: string | null;
}

// Omit properties we don't use
// export type IFirebaseUserProfile = Omit<
//   IFirebaseUser,
//   | "metadata"
//   | "delete"
//   | "getIdToken"
//   | "getIdTokenResult"
//   | "reload"
//   | "toJSON"
//   | "emailVerified"
//   | "isAnonymous"
//   | "providerData"
//   | "refreshToken"
//   | "tenantId"
// >;
export interface IAuthState {
  firebaseUID?: string | null;
  userName: string | null;
  // userToken: string | null;
  userEmail: string | null;
  sessionTimedOut: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
}
