import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../../utility/const'
import { AddMember, AddMemberResponse, GetMemberResponse, GetTeams, GetTeamsResponse, Member, UpdateMember, UpdateMemberResponse, UpdateTeam, UpdateTeamResponse } from '../../types/sdk'
import { RootState } from '../store';

export const teamMemberAPI = createApi({
    reducerPath: 'teamMemberAPI',
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
        addMember: builder.mutation<AddMemberResponse, AddMember>({
            query: (data) => ({
                url: `/team-member/add`,
                method: 'POST',
                body: data
            })
        }),

        getMembers: builder.query<GetTeamsResponse, { id: string, params: GetTeams }>({
            query: ({ id, params }) => ({
                url: `/team-member/byTeam/${id}`,
                params: params
            })
        }),

        getMember: builder.query<Member, string>({
            query: (id) => ({
                url: `/team-member/${id}`
            })
        }),

        deleteMember: builder.mutation<void, string>({
            query: (id) => ({
                url: `/team-member/${id}`,
                method: 'DELETE',
            })
        }),

        updateMember: builder.mutation<UpdateMemberResponse, UpdateMember>({
            query: (data) => ({
                url: `/team-member`,
                method: 'PUT',
                body: data
            })
        })
    }),
})


export const { useAddMemberMutation, useLazyGetMemberQuery, useGetMembersQuery, useLazyGetMembersQuery, useDeleteMemberMutation, useUpdateMemberMutation } = teamMemberAPI