import { baseApi } from "../../api/baseApi";

const createProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    product: builder.mutation({
      query: (productInfo) => ({
        url: "/create-flower",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["flower"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/all-flowers",
        method: "GET",
      }),
      providesTags: ["flower"],
    }),
    getSingleFlower: builder.query({
      query: (id) => ({
        url: `/single-flower/${id}`,
        method: "GET",
      }),
    }),
    updateFlower: builder.mutation({
      query: ({ id, flowerUpdatedData }) => ({
        url: `/update-flower/${id}`,
        method: "PATCH",
        body: flowerUpdatedData,
      }),
      invalidatesTags: ["flower"],
    }),

    deleteFlower: builder.mutation({
      query: (flowerId: string) => ({
        url: `/delete-flower/${flowerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flower"],
    }),
  }),
});

export const {
  useProductMutation,
  useGetAllProductsQuery,
  useDeleteFlowerMutation,
  useUpdateFlowerMutation,
  useGetSingleFlowerQuery,
} = createProduct;
