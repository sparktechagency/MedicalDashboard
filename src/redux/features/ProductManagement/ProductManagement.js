import { baseApi } from "../../baseApi/baseApi";

const ProductManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductAll: builder.query({
      query: () => ({
        url: `/product/all`,
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

export const { useGetProductAllQuery, useGetProductSingleQuery, useUpdateProductMutation, useDeleteProductMutation } = ProductManagementApi;