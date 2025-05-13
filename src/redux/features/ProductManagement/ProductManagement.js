import { baseApi } from "../../baseApi/baseApi";

const ProductManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductAll: builder.query({
      query: ({ from, to }) => ({
        url: `/admin/v2/product?from=${from}&to=${to}`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getProductSearch: builder.query({
      query: ({text}) => ({
        url: `/admin/v2/user/${text}`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    UpdateProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/v2/ban-user/${id}`,
        method: "POST",
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

export const { useGetProductAllQuery, useGetProductSearchQuery, useUpdateProductMutation, useDeleteProductMutation } = ProductManagementApi;