import { baseApi } from "../../baseApi/baseApi";

const VendorRequests = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductRequestAll: builder.query({
      query: () => ({
        url: `/product/request`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    getProductSingles: builder.query({
      query: (id) => ({
        url: `/product/single/${id}`,
        method: 'GET',
      }),
      providesTags: ['product'],
    }),
    UpdatedeclineProduct: builder.mutation({
      query: (id) => ({
        url: `/product/decline/${id}`,
        method: "PATCH",
      }),
    }),
    UpdateApproveProduct: builder.mutation({
      query: (id) => ({
        url: `/product/approve/${id}`,
        method: "PATCH",
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
    useGetProductRequestAllQuery,
    useGetProductSinglesQuery,
    useUpdatedeclineProductMutation,
    useUpdateApproveProductMutation,
} = VendorRequests;