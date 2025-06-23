import { baseApi } from "../../baseApi/baseApi";

const aboutsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UpdateAbouts: builder.mutation({
      query: (data) => ({
        url: "/setting/about_us",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["settings"],
    }),
    getAllAbouts: builder.query({
      query: () => ({
        url: "/setting/about_us",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useGetAllAboutsQuery,
  useUpdateAboutsMutation
} = aboutsApi;