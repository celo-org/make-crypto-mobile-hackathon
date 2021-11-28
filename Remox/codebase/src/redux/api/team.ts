import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../../utility/const'
import { CreateTeam, CreateTeamResponse, GetTeams, GetTeamsResponse, GetTeamsWithMembers, GetTeamsWithMembersResponse, UpdateTeam, UpdateTeamResponse } from '../../types/sdk'
import { RootState } from '../store';

export const teamAPI = createApi({
  reducerPath: 'teamAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).storage?.user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTeam: builder.mutation<CreateTeamResponse, CreateTeam>({
      query: (data) => ({
        url: '/team/create',
        method: 'POST',
        body: data
      }),
    }),

    getTeams: builder.query<GetTeamsResponse, GetTeams>({
      query: (data) => ({
        url: `/team/byAccount`,
        params: data
      })
    }),

    getTeamsWithMembers: builder.query<GetTeamsWithMembersResponse, GetTeamsWithMembers>({
      query: (data) => ({
        url: `/team/byAccount/withMembers`,
        params: data
      })
    }),

    deleteTeam: builder.mutation<any, string>({
      query: (id) => ({
        url: `/team/${id}`,
        method: 'DELETE'
      })
    }),

    updateTeam: builder.mutation<UpdateTeamResponse, { id: string, body: UpdateTeam }>({
      query: ({ id, body }) => ({
        url: `/team/${id}`,
        method: 'PATCH',
        body: body
      })
    })
  }),
})


export const { useCreateTeamMutation, useLazyGetTeamsQuery, useLazyGetTeamsWithMembersQuery ,useGetTeamsWithMembersQuery, useDeleteTeamMutation, useUpdateTeamMutation } = teamAPI