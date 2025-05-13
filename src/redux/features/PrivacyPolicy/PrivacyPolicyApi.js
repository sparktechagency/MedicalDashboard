import { baseApi } from "../../baseApi/baseApi";

const PrivacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePrivacyPolicy: builder.mutation({
      query: (content) => ({
        url: "/info/privacy-policy",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["settings"],
    }),
    getAllPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/privacy-policy",
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