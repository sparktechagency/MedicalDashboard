import { baseApi } from "../../baseApi/baseApi";

const Orders = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductAll: builder.query({
      query: () => ({
        url: `/product/self`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getBitAll: builder.query({
      query: (id) => ({
        url: `/bid/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getProductAll: builder.query({
      query: () => ({
        url: `/product/self`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getProductSingle: builder.query({
      query: (id) => ({
        url: `/product/single/${id}`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    UpdateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { 
  useGetProductSingleQuery,
  useGetProductAllQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetBitAllQuery,
} = Orders;