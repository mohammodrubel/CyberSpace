import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, type TagType } from "@/redux/TagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: Object.values(tagTypes) as TagType[],
  endpoints: () => ({}),
});
