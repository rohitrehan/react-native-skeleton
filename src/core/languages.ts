import { en as enLanguage } from "./languages/en";

export enum LanguageKey {
  en = "en",
  hi = "hi",
}

export interface IAppLanguage {
  labelGoogleSignIn: string;
  WelcomeButtonText: string;
  WelcomeHeadline1: string;
  WelcomeHeadline2: string;
  WelcomeSlogan: string;
  LABEL_AlreadyAUser: string;
  PLACEHOLDER_ConfirmPassword: string;
  LABEL_ConfirmPassword: string;
  ERROR_InvalidEmail: string;
  LABEL_LastName: string;
  ERROR_LastNameIsRequired: string;
  PLACEHOLDER_FirstName: string;
  ERROR_ConfirmPassword: string;
  PLACEHOLDER_LastName: string;
  LABEL_FirstName: string;
  ERROR_InvalidName: string;
  ERROR_FirstNameIsRequired: string;
  TITLE_Register: string;
  LABEL_Password: string;
  ERROR_PasswordIsRequired: string;
  LABEL_NotAUser: string;
  TITLE_Login: string;
  ERROR_EmailIsRequired: string;
  LABEL_EmailAddress: string;
}

export interface ILanguagesMap {
  [key: string]: IAppLanguage;
}

export const languages: ILanguagesMap = {
  [LanguageKey.en]: enLanguage,
  [LanguageKey.hi]: enLanguage,
};

export const defaultLanguage = languages[LanguageKey.en];
