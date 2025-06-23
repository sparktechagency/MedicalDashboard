import { baseApi } from "../../baseApi/baseApi";

const Orders = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersAll: builder.query({
      query: () => ({
        url: `/bid/order`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getOrdersSingle: builder.query({
      query: (id) => ({
        url: `/product/single/${id}`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    UpdateOrders: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetOrdersAllQuery,
} = Orders;