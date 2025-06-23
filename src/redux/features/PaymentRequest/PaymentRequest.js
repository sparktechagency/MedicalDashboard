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
    UpdatedeclinePayment: builder.mutation({
      query: (id) => ({
        url: `/product/decline/${id}`,
        method: "PATCH",
      }),
    }),
    UpdateApprovePayment: builder.mutation({
      query: (id) => ({
        url: `/product/approve/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { 
  useGetPaymentRequestQuery,
} = PaymentRequest;