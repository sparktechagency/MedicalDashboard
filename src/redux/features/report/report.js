import { baseApi } from "../../baseApi/baseApi";

const Report = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReport: builder.query({
      query: () => ({
        url: "/report/all",
        method: "GET",
      }),
      providesTags:["report"],
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: "//report/delete/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),
    
    getSingleReport: builder.query(
      {
        query: (id) => ({
          url: `/report/single/${id}`,
          method: "GET"
        })
      }
    ),

    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/report/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["report"],
    }),
  
  }),
});

export const {
    useGetAllReportQuery,
    useGetSingleReportQuery,
    useDeleteReportMutation,
} = Report;