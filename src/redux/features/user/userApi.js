import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
     query: () => ({
        url: `/users/all`, // Replace with the actual endpoint for fetching users
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getEventManager: builder.query({
     query: () => ({
        url: '/auth/eventManager', // Replace with the actual endpoint for fetching users
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getRecentUser: builder.query({
     query: () => ({
        url: '/users/all', 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetEventManagerQuery, useGetRecentUserQuery } = userApi;
