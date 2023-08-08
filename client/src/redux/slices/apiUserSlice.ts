/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiSlice } from './apiSlice';
import { USERS_URL } from '../../config/constants';
import { UserType } from '../../types';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<UserType, { email: string; password: string }>({
            query: data => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        register: builder.mutation<
            UserType,
            { email: string; password: string; name: string }
        >({
            query: data => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        updateProfile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteProfile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'DELETE',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation
} = usersApiSlice;
