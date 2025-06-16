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
    UpdateMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
   
  }),
});

export const {
  useGetAllMessageQuery,
  useUpdateMessageMutation
} = MessageManagementApi;