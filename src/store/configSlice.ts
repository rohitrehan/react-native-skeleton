/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../interfaces/IAuthentication";
import { RootState } from "./appStore";
import { IAppConfig } from "../interfaces/IAppConfig";
import { LanguageKey } from "../core/languages";

const initialState: IAppConfig = {
  language: LanguageKey.en,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    languageChanged: (state, action: PayloadAction<LanguageKey>) => {
      state.language = action.payload;
    },
  },
});

export const { languageChanged } = configSlice.actions;

export const selectConfig = (state: RootState): IAppConfig => state.config;

export default configSlice.reducer;
