import { baseApi } from "../../baseApi/baseApi";

const ProductManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getCategoryAll: builder.query({
      query: () => ({
        url: `/category`,
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
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { 
    useCreateCategoryMutation,
    useGetCategoryAllQuery,
    useDeleteCategoryMutation,
} = ProductManagementApi;