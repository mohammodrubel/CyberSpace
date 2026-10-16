import { createSlice } from "@reduxjs/toolkit";
import { syncProducts } from "./thunks";

type SettingsState = { showPrices: boolean; showStock: boolean; lastSyncAt: string | null };

const initialState: SettingsState = { showPrices: true, showStock: true, lastSyncAt: null };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowPrices(state, action: { payload: boolean }) { state.showPrices = action.payload; },
    setShowStock(state, action: { payload: boolean }) { state.showStock = action.payload; },
    hydrateSettings(state, action: { payload: Partial<SettingsState> }) { Object.assign(state, action.payload); },
  },
  extraReducers: (b) => {
    b.addCase(syncProducts.fulfilled, (state, action) => { state.lastSyncAt = action.payload.at; });
  },
});

export const { setShowPrices, setShowStock, hydrateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
