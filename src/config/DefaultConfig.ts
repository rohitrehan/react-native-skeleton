import {ThemeKey} from './themes';
import {LanguageKey} from './languages';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

export interface AppTheme {
  key: ThemeKey;
  colors: MD3Colors;
}

export interface ApplicationConfig {
  theme: ThemeKey;
  language: LanguageKey;
}

export const defaultConfig: ApplicationConfig = {
  theme: ThemeKey.light,
  language: LanguageKey.en,
};
