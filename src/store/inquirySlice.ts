import { createSlice, nanoid } from "@reduxjs/toolkit";

export type InquiryStatus = "new" | "inProgress" | "done";

export type Inquiry = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
};

type InquiryState = { items: Inquiry[]; modalProductId: string | null };

const initialState: InquiryState = { items: [], modalProductId: null };

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    openInquiry(s, a: { payload: string }) { s.modalProductId = a.payload; },
    closeInquiry(s) { s.modalProductId = null; },
    addInquiry: {
      reducer(s, a: { payload: Inquiry }) { s.items.unshift(a.payload); },
      prepare(data: Omit<Inquiry, "id" | "createdAt" | "status">) {
        return { payload: { ...data, id: nanoid(8), createdAt: new Date().toISOString(), status: "new" as InquiryStatus } };
      },
    },
    setInquiryStatus(s, a: { payload: { id: string; status: InquiryStatus } }) {
      const it = s.items.find((i) => i.id === a.payload.id);
      if (it) it.status = a.payload.status;
    },
    hydrateInquiries(s, a: { payload: Inquiry[] }) { s.items = a.payload; },
  },
});

export const { openInquiry, closeInquiry, addInquiry, setInquiryStatus, hydrateInquiries } = inquirySlice.actions;
export default inquirySlice.reducer;
