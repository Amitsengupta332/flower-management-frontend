import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (couponInfo) => ({
        url: "coupon/createCoupon",
        method: "POST",
        body: couponInfo,
      }),
    }),
  }),
});

export const { useAddCouponMutation } = couponApi;
