import { baseApi } from "../api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message?: string | null;
  status: string;
  createdAt: string;
  product?: { id: string; translations?: { lang: string; name: string }[] };
  submittedBy?: { id: number; name?: string; email: string } | null;
}

interface SubmitInquiryPayload {
  productId: string;
  name: string;
  phone: string;
  message?: string;
}

export const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitInquiry: builder.mutation<{ success: boolean }, SubmitInquiryPayload>({
      query: (body) => ({ url: "/inquiries", method: "POST", body }),
      invalidatesTags: [tagTypes.inquiry],
    }),
    getInquiries: builder.query<Inquiry[], void>({
      query: () => "/inquiries",
      providesTags: [tagTypes.inquiry],
      transformResponse: (res: { data?: Inquiry[] }) => res.data ?? [],
    }),
    getUserInquiries: builder.query<Inquiry[], void>({
      query: () => "/user/inquiries",
      providesTags: [tagTypes.inquiry],
      transformResponse: (res: { data?: Inquiry[] }) => res.data ?? [],
    }),
    updateInquiry: builder.mutation<{ success: boolean }, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/admin/inquiries/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tagTypes.inquiry],
    }),
  }),
});

export const {
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useGetUserInquiriesQuery,
  useUpdateInquiryMutation,
} = inquiryApi;
