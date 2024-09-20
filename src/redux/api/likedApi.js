import { api } from "./index";

const likedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLikedProducts: build.mutation({
      query: (id) => ({
        url: `/product/${id}/like`,
        method: "PATCH",
      }),
    }),
    unLikeProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}/unlike`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetLikedProductsMutation, useUnLikeProductMutation } = likedApi;
