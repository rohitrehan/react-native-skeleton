import { en as enLanguage } from './languages/en';

export enum LanguageKey {
  en = 'en',
  hi = 'hi',
}

export interface IAppLanguage {
  ERROR_PhoneNumberInvalid: string;
  LABEL_PhoneNumber: string;
  PLACEHOLDER_PhoneNumber: string;
  ERROR_PhoneNumberIsRequired: string;
  LABEL_UseEmailLogin: string;
  LABEL_UsePhoneLogin: string;
  LABEL_UseEmailSignup: string;
  LABEL_UsePhoneSignup: string;
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
  LABEL_EmailLoginButton: string;
  LABEL_PhoneLoginButton: string;
  LABEL_PhoneLoginOtpButton: string;
  LABEL_SignUpEmailButton: string;
}

export interface ILanguagesMap {
  [key: string]: IAppLanguage;
}

export const languages: ILanguagesMap = {
  [LanguageKey.en]: enLanguage,
  [LanguageKey.hi]: enLanguage,
};

export const defaultLanguage = languages[LanguageKey.en];
