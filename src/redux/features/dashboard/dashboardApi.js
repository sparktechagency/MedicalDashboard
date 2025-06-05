import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/dashboard/admin/statistics",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getTransactionRatio: builder.query({
      query: () => ({
        url: "/dashboard/admin/transaction_ratio",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const { useGetDashboardStatusQuery, useGetTransactionRatioQuery } = dashboardApi;
