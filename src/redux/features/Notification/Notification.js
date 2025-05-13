import { baseApi } from "../../baseApi/baseApi";

const NotificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: "/notification/",
        method: "GET",
      }),
      providesTags:["NotificationApi"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetNotificationQuery
} = NotificationApi;