import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (createSalesInfo) => ({
        url: "/sales/create-sales",
        method: "POST",
        body: createSalesInfo,
      }),
      invalidatesTags: ["sales", "flower"],
    }),
    getAllSales: builder.query({
      query: () => ({
        url: "/sales/sales-history",
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSalesMutation, useGetAllSalesQuery } = salesApi;
