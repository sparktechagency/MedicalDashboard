import { use } from "react";
import { baseApi } from "../../baseApi/baseApi";
const Agreement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserAgreement: builder.mutation({
      query: (content) => ({
        url: "/setting/user_agreement",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["settings"],
    }),
    getAllUserAgreement: builder.query({
      query: () => ({
        url: "/setting/user_agreement",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
    updateSellerAgreement: builder.mutation({
      query: (content) => ({
        url: "/setting/seller_agreement",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["settings"],
    }),
    getAllSellerAgreement: builder.query({
      query: () => ({
        url: "/setting/seller_agreement",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useGetAllSellerAgreementQuery,
  useUpdateSellerAgreementMutation,
  useUpdateUserAgreementMutation,
  useGetAllUserAgreementQuery
} = Agreement;