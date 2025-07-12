import { baseApi } from "../../baseApi/baseApi";

const PaymentRequest = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentRequest: builder.query({
      query: () => ({
        url: `/payout/all`,
        method: "GET",
      }),
      providesTags: ["product"]
    }),
    MakeApprovePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payout/status/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetPaymentRequestQuery,
  useMakeApprovePaymentMutation,
} = PaymentRequest;