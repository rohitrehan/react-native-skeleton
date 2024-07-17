import {AppTheme} from './DefaultConfig';

export enum ThemeKey {
  light = 'light',
  dark = 'dark',
}

export interface ThemesMap {
  [key: string]: AppTheme;
}

export const darkTheme: AppTheme = {
  key: ThemeKey.dark,
  colors: {
    primary: 'rgb(206, 189, 255)',
    onPrimary: 'rgb(57, 5, 144)',
    primaryContainer: 'rgb(80, 43, 167)',
    onPrimaryContainer: 'rgb(232, 221, 255)',
    secondary: 'rgb(203, 195, 220)',
    onSecondary: 'rgb(51, 45, 65)',
    secondaryContainer: 'rgb(73, 68, 88)',
    onSecondaryContainer: 'rgb(232, 222, 248)',
    tertiary: 'rgb(255, 184, 101)',
    onTertiary: 'rgb(72, 42, 0)',
    tertiaryContainer: 'rgb(102, 61, 0)',
    onTertiaryContainer: 'rgb(255, 221, 186)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 27, 30)',
    onBackground: 'rgb(230, 225, 230)',
    surface: 'rgb(28, 27, 30)',
    onSurface: 'rgb(230, 225, 230)',
    surfaceVariant: 'rgb(72, 69, 78)',
    onSurfaceVariant: 'rgb(202, 196, 207)',
    outline: 'rgb(148, 143, 153)',
    outlineVariant: 'rgb(72, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(230, 225, 230)',
    inverseOnSurface: 'rgb(49, 48, 51)',
    inversePrimary: 'rgb(104, 71, 192)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 35, 41)',
      level2: 'rgb(42, 40, 48)',
      level3: 'rgb(48, 45, 55)',
      level4: 'rgb(49, 46, 57)',
      level5: 'rgb(53, 50, 62)',
    },
    surfaceDisabled: 'rgba(230, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(230, 225, 230, 0.38)',
    backdrop: 'rgba(50, 47, 56, 0.4)',
  },
};

export const lightTheme: AppTheme = {
  key: ThemeKey.light,
  colors: {
    primary: 'rgb(104, 71, 192)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(232, 221, 255)',
    onPrimaryContainer: 'rgb(33, 0, 93)',
    secondary: 'rgb(97, 91, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(232, 222, 248)',
    onSecondaryContainer: 'rgb(29, 25, 43)',
    tertiary: 'rgb(135, 82, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 221, 186)',
    onTertiaryContainer: 'rgb(43, 23, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 27, 30)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 27, 30)',
    surfaceVariant: 'rgb(230, 224, 236)',
    onSurfaceVariant: 'rgb(72, 69, 78)',
    outline: 'rgb(121, 117, 127)',
    outlineVariant: 'rgb(202, 196, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 48, 51)',
    inverseOnSurface: 'rgb(244, 239, 244)',
    inversePrimary: 'rgb(206, 189, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 242, 252)',
      level2: 'rgb(243, 237, 250)',
      level3: 'rgb(238, 231, 248)',
      level4: 'rgb(237, 229, 247)',
      level5: 'rgb(234, 226, 246)',
    },
    surfaceDisabled: 'rgba(28, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(28, 27, 30, 0.38)',
    backdrop: 'rgba(50, 47, 56, 0.4)',
  },
};

export const themes: ThemesMap = {
  [ThemeKey.light]: lightTheme,
  [ThemeKey.dark]: darkTheme,
};

export const defaultTheme = themes[ThemeKey.light];
