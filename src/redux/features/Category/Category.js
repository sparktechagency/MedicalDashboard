import { baseApi } from "../../baseApi/baseApi";

const categoryManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getCategoryAll: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags: ["category"]
    }),
    getCategorySingle: builder.query({
        query: (id) => ({
          url: `/category/single/${id}`,
          method: "GET",
        }),
        providesTags: ["category"]
  }),
    UpdateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { 
    useCreateCategoryMutation,
    useGetCategoryAllQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategorySingleQuery,
} = categoryManagementApi;