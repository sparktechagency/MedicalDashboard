import { baseApi } from "../../baseApi/baseApi";

const TermsConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UpdateTermCondition: builder.mutation({
      query: (data) => ({
        url: "/setting/terms",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["settings"]
    }),
    
    getAllTermCondition: builder.query({
      query: () => ({
        url: "/setting/terms",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useUpdateTermConditionMutation,
  useGetAllTermConditionQuery
} = TermsConditionsApi;
