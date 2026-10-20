import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InquiryState {
  modalProductId: string | null;
}

const inquirySlice = createSlice({
  name: "inquiry",
  initialState: { modalProductId: null } as InquiryState,
  reducers: {
    openInquiry(state, action: PayloadAction<string>) {
      state.modalProductId = action.payload;
    },
    closeInquiry(state) {
      state.modalProductId = null;
    },
  },
});

export const { openInquiry, closeInquiry } = inquirySlice.actions;
export default inquirySlice.reducer;
