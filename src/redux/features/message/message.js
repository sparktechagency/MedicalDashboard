import { baseApi } from "../../baseApi/baseApi";

const MessageManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessage: builder.query({
      query: () => ({
        url: `/contact/all`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllbidMessage: builder.query({
      query: (id) => ({
        url: `/product/seller/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
   
  }),
});

export const {
  useGetAllMessageQuery,
  useGetAllbidMessageQuery
} = MessageManagementApi;