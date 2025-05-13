import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.wokedatingsite.com/api/v1",
    // baseUrl: "http://10.0.60.206:8080/api/v1",
    // baseUrl: "https://api.accountabilityworld.org/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from your store or local storage
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "report", "admin", "settings", "Categories", "NotificationApi", "advertisement", "product", "subscription"],
  endpoints: () => ({}),
});
