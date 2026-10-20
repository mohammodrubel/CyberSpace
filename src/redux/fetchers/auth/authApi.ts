import { baseApi } from "../api/baseApi";
import { tagTypes } from "@/redux/TagTypes";
import type { DecodedUser } from "@/lib/jwt_decode";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<DecodedUser, void>({
      query: () => "/auth/me",
      providesTags: [tagTypes.user],
      transformResponse: (res: { success?: boolean; data?: DecodedUser }) => res.data!,
    }),
    login: builder.mutation<{ success: boolean }, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: [tagTypes.user],
    }),
    register: builder.mutation<{ success: boolean }, { name: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: [tagTypes.user],
    }),
    logoutFromDb: builder.mutation<{ success: boolean }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: builder.mutation<{ success: boolean }, { oldPassword: string; newPassword: string }>({
      query: (body) => ({ url: "/user/change-password", method: "POST", body }),
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutFromDbMutation,
  useChangePasswordMutation,
} = authApi;
