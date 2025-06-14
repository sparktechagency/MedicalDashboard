import { baseApi } from "../../baseApi/baseApi";

const VendorManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendor: builder.query({
      query: ({ role,}) => ({
        url: `/users/all?role=${role}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllbidVendor: builder.query({
      query: (id) => ({
        url: `/product/seller/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
   
  }),
});

export const {
  useGetAllVendorQuery,
  useGetAllbidVendorQuery
} = VendorManagementApi;