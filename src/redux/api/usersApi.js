import { api } from "./index";

const usersApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "/admin/registered-users",
            method: "GET"
         }),
         providesTags: ["Users"],
      }),
      deleteUser:build.mutation({
         query: (id) => ({
            url: `/admin/delete-user/${id}`,
            method: "DELETE"
         }),
         invalidatesTags: ["Users"],
      }),
      promoteUser:build.mutation({
         query: (body) => ({
            url: `/admin/add-admin`,
            method: "POST",
            body,
         }),
         invalidatesTags: ["Users"],
      })
   }),
});

export const { useUserQuery, useDeleteUserMutation, usePromoteUserMutation} = usersApi