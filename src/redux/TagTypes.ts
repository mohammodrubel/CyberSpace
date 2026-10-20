export const tagTypes = {
  user: "user",
  product: "product",
  inquiry: "inquiry",
  settings: "settings",
  banner: "banner",
  partner: "partner",
  news: "news",
  homeContent: "homeContent",
  category: "category",
} as const;

export type TagType = (typeof tagTypes)[keyof typeof tagTypes];
