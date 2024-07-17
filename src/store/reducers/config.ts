import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {ApplicationConfig, defaultConfig} from '../../config/DefaultConfig';
import {LanguageKey} from '../../config/languages';
import {ThemeKey} from '../../config/themes';
import {RootState} from '..';

enum ActionType {
  SET_THEME = 'SET_THEME',
  SET_LANGUAGE = 'SET_LANGUAGE',
}

// type ConfigReducerType = Reducer<ApplicationConfig, ThemeAction>;
// const initState: ReducerState<ConfigReducerType> = defaultConfig;

const initState: ApplicationConfig = defaultConfig;

export const updateTheme = createAction<ThemeKey>(ActionType.SET_THEME);
export const updateLanguage = createAction<LanguageKey>(
  ActionType.SET_LANGUAGE,
);

const configReducer = createReducer(initState, builder => {
  builder.addCase(
    updateLanguage,
    (state: ApplicationConfig, action: PayloadAction<LanguageKey>) => {
      state.language = action.payload;
    },
  );
  builder.addCase(
    updateTheme,
    (state: ApplicationConfig, action: PayloadAction<ThemeKey>) => {
      state.theme = action.payload;
    },
  );
});

export const selectTheme = (state: RootState) => state.config.theme;

export default configReducer;
