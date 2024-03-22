import { TFlowers } from "../../../types/flower.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const createProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/all-flowers",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFlowers[]>) => {
        // console.log("inside redux", response);
        return {
          // : TResponseRedux<TFlower[]>
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["flower"],
    }),
    product: builder.mutation({
      query: (productInfo) => ({
        url: "/create-flower",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["flower"],
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
    deleteBulkFlower: builder.mutation({
      query: (flowerIdArray: React.Key[]) => ({
        url: "/",
        method: "DELETE",
        body: { flowerIdArray },
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
  useDeleteBulkFlowerMutation,
} = createProduct;

//    getAllProducts: builder.query({
//   query: () => ({
//     url: "/all-flowers",
//     method: "GET",
//   }),
//   providesTags: ["flower"],
// }),

//
// getAllProducts: builder.query({
//   query: (args) => {
//     const params = new URLSearchParams();

//     if (args) {
//       args.forEach((item: TQueryParam) => {
//         params.append(item.name, item.value as string);
//       });
//     }

//     return {
//       url: "/academic-semesters",
//       method: "GET",
//       params: params,
//     };
//   },
// transformResponse: (response: TResponseRedux<TFlower[]>) => {
//   return {
//     data: response.data,
//     meta: response.meta,
//   };
// },
// }),

// getAllProducts: builder.query({
//   query: (args) => {
//     const params = new URLSearchParams();

//     if (args) {
//       args.forEach((item: TQueryParam) => {
//         params.append(item.name, item.value as string);
//       });
//     }

//     return {
//       url: "/all-flowers",
//       method: "GET",
//       params: params,
//     };
//   },
//   transformResponse: (response: TResponseRedux<TFlowers[]>) => {
//     // console.log("inside redux", response);
//     return {
//       // : TResponseRedux<TFlower[]>
//       data: response.data,
//       meta: response.meta,
//     };
//   },
//   providesTags: ["flower"],
// }),
