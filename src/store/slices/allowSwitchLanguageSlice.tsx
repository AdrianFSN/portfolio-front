import { createSlice } from "@reduxjs/toolkit";

const switchLangInitialState = {
  allowSwitch: true,
};

const allowSwitchLanguageSlice = createSlice({
  name: "allowSwitchLanguageSlice",
  initialState: switchLangInitialState,
  reducers: {
    setAllowSwitchLanguage: (state, action) => {
      state.allowSwitch = action.payload;
    },
    resetAllowSwitchLanguage: (state) => {
      state.allowSwitch = switchLangInitialState.allowSwitch;
    },
  },
});

export const { setAllowSwitchLanguage, resetAllowSwitchLanguage } =
  allowSwitchLanguageSlice.actions;
export default allowSwitchLanguageSlice.reducer;
