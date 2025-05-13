import { baseApi } from "../../baseApi/baseApi";

const Report = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateReport: builder.mutation({
      query: (data) => ({
        url: "/info/all-reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),
    getAllReport: builder.query({
      query: () => ({
        url: "/info/all-reports",
        method: "GET",
      }),
      providesTags:["report"],
    }),
    getSingleContentModeration: builder.query(
      {
        query: (id) => ({
          url: `/info/report-detels/${id}`,
          method: "GET"
        })
      }
    ),
    deleteReport: builder.mutation({
      query: (data) => ({
        url: '/info/delete-report-image',
        method: 'DELETE',
        body: data,
      }),
    }),
    DeclientReport: builder.mutation({
      query: (data) => ({
        url: "/info/decline-report",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),
  }),
});

export const {
    useGetAllReportQuery,
    useUpdateReportMutation,
    useGetSingleContentModerationQuery,
    useDeleteReportMutation,
    useDeclientReportMutation,
} = Report;