import { baseApi } from "../../baseApi/baseApi";

const Earnings = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: () => ({
        url: "/payment/product_transactions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllEarningsQuery
} = Earnings;