import { baseApi } from "../api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export interface Banner {
  id: number;
  titleAZ: string;
  titleEN: string;
  titleRU: string;
  subtitleAZ: string | null;
  subtitleEN: string | null;
  subtitleRU: string | null;
  descAZ: string | null;
  descEN: string | null;
  descRU: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  ctaText2: string | null;
  ctaUrl2: string | null;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateBannerInput = Omit<Banner, "id" | "createdAt" | "updatedAt">;
export type UpdateBannerInput = Partial<CreateBannerInput>;

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], void>({
      query: () => "/banners",
      providesTags: [tagTypes.banner],
      transformResponse: (res: { data?: Banner[] }) => res.data ?? [],
    }),
    getActiveBanners: builder.query<Banner[], void>({
      query: () => "/banners/active",
      providesTags: [tagTypes.banner],
      transformResponse: (res: { data?: Banner[] }) => res.data ?? [],
    }),
    getBannerById: builder.query<Banner, number>({
      query: (id) => `/banners/${id}`,
      providesTags: [tagTypes.banner],
      transformResponse: (res: { data?: Banner }) => res.data!,
    }),
    createBanner: builder.mutation<Banner, CreateBannerInput>({
      query: (body) => ({ url: "/banners", method: "POST", body }),
      invalidatesTags: [tagTypes.banner],
      transformResponse: (res: { data?: Banner }) => res.data!,
    }),
    updateBanner: builder.mutation<Banner, { id: number; body: UpdateBannerInput }>({
      query: ({ id, body }) => ({ url: `/banners/${id}`, method: "PATCH", body }),
      invalidatesTags: [tagTypes.banner],
      transformResponse: (res: { data?: Banner }) => res.data!,
    }),
    deleteBanner: builder.mutation<void, number>({
      query: (id) => ({ url: `/banners/${id}`, method: "DELETE" }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetActiveBannersQuery,
  useGetBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
