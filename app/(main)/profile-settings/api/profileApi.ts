import { baseApi } from '@/shared/api/baseApi';
import type { ProfileFormData } from '../model/schema';
import { ProfileResponse } from '../model/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/me/profile',
      providesTags: ['User'],
    }),
    updateMyProfile: builder.mutation<ProfileResponse, Partial<ProfileFormData>>({
      query: (body) => {
        const { dateOfBirth, ...rest } = body;
        
        return {
          url: '/users/me/profile',
          method: 'PATCH',
          body: {
            ...rest,
            birthDate: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : null,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;