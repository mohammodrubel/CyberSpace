import { baseApi } from "../api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export interface Category {
  id: number;
  slug: string;
  nameAZ: string;
  nameEN: string;
  nameRU: string;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  slug: string;
  nameAZ: string;
  nameEN: string;
  nameRU: string;
  imageUrl?: string | null;
  isActive?: boolean;
  order?: number;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: [tagTypes.category],
      transformResponse: (res: { data?: Category[] }) => res.data ?? [],
    }),
    createCategory: builder.mutation<Category, CreateCategoryInput>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: [tagTypes.category],
      transformResponse: (res: { data?: Category }) => res.data!,
    }),
    updateCategory: builder.mutation<Category, { id: number; body: UpdateCategoryInput }>({
      query: ({ id, body }) => ({ url: `/categories/${id}`, method: "PATCH", body }),
      invalidatesTags: [tagTypes.category],
      transformResponse: (res: { data?: Category }) => res.data!,
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
