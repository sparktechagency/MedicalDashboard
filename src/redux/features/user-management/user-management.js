import { baseApi } from "../../baseApi/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/admin/users/all`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    UpdateUserManagement: builder.mutation({
      query: (id) => ({
        url: `/admin/v2/ban-user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    UpdateUserUnblock: builder.mutation({
      query: (id) => ({
        url: `/admin/v2/unban-user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/admin/user/remove",
        method: "POST",
        body:data
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserSearchQuery,
  useUpdateUserManagementMutation,
  useUpdateUserUnblockMutation,
  useDeleteUserMutation
} = userManagementApi;
