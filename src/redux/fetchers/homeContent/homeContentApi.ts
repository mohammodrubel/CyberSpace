import { baseApi } from "../api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export interface HomeContentItem {
  id: number;
  key: string;
  value: unknown;
  createdAt: string;
  updatedAt: string;
}

export const homeContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeContent: builder.query<HomeContentItem[], void>({
      query: () => "/home-content",
      providesTags: [tagTypes.homeContent],
      transformResponse: (res: { data?: HomeContentItem[] }) => res.data ?? [],
    }),
    getHomeContentByKey: builder.query<HomeContentItem, string>({
      query: (key) => `/home-content/${encodeURIComponent(key)}`,
      providesTags: [tagTypes.homeContent],
      transformResponse: (res: { data?: HomeContentItem }) => res.data!,
    }),
    updateHomeContent: builder.mutation<HomeContentItem, { key: string; value: unknown }>({
      query: ({ key, value }) => ({ url: `/home-content/${encodeURIComponent(key)}`, method: "PUT", body: { value } }),
      invalidatesTags: [tagTypes.homeContent],
      transformResponse: (res: { data?: HomeContentItem }) => res.data!,
    }),
  }),
});

export const {
  useGetHomeContentQuery,
  useGetHomeContentByKeyQuery,
  useUpdateHomeContentMutation,
} = homeContentApi;
