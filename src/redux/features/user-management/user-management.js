import { baseApi } from "../../baseApi/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ role, limit, page  }) => ({
        url: `/users/all?role=${role}&limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllbidUser: builder.query({
      query: (id) => ({
        url: `/bid/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
   
  }),
});

export const {
  useGetAllUserQuery,
  useGetAllbidUserQuery
} = userManagementApi;
