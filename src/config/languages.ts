import {en as enLanguage} from './languages/en';

export enum LanguageKey {
  en = 'en',
  hi = 'hi',
}

export interface AppLanguage {
  defaultTheme: string;
  defaultLanguage: string;
  welcome: string;
  slogan: string;
  title: string;
  forgetText: string;
  home: string;
  profile: string;
  logout: string;
  editProfile: string;
  save: string;
  backText: string;
  labelFacebook: string;
  labelGoogle: string;
  labelLogin: string;
  labelCheckAcc: string;
  labelChoice: string;
  labelSignupWith: string;
  labelSignupOr: string;
  labelSignin: string;
  labelSignup: string;
  phonePlaceholder: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  userPlaceholder: string;
  passPlaceholder: string;
  confirmPlaceholder: string;
  labelForget: string;
  checkText: string;
  choiceOne: string;
  resetPass: string;
  newAccount: string;
  selectGender: string;
  loginValidation: loginValidation;
  signupValidation: signupValidation;
}

export interface loginValidation {
  username: string;
  password: string;
  passwordLength: string;
}

export interface signupValidation {
  username: string;
  email: string;
  validEmail: string;
  phone: string;
  validPhone: string;
  password: string;
  passwordLength: string;
  confirmPassword: string;
  checkPassword: string;
}

export interface LanguagesMap {
  [key: string]: AppLanguage;
}

export const languages: LanguagesMap = {
  [LanguageKey.en]: enLanguage,
  [LanguageKey.hi]: enLanguage,
};

export const defaultLanguage = languages[LanguageKey.en];
