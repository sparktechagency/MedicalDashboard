import { baseApi } from "../../baseApi/baseApi";

const PrivacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePrivacyPolicy: builder.mutation({
      query: (content) => ({
        url: "/setting/privacy",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["settings"],
    }),
    getAllPrivacyPolicy: builder.query({
      query: () => ({
        url: "/setting/privacy",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation
} = PrivacyPolicyApi;