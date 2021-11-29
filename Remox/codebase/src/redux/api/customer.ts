import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../../utility/const'
import { CustomerCreate, CustomerCreateResponse, GetCustomer } from '../../types/sdk'
import { RootState } from '../store';

export const customerAPI = createApi({
    reducerPath: 'customerAPI',
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
        customerCreate: builder.mutation<CustomerCreateResponse, CustomerCreate>({
            query: (data) => ({
                url: '/customer/create',
                method: 'POST',
                body: data
            }),
        }),

        getCustomer: builder.query<CustomerCreateResponse[], GetCustomer>({
            query: (data) => ({
                url: `/customer/byAccount`,
                params: data
            })
        }),

        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `/customer/${id}`,
                method: 'DELETE',
            })
        }),

    }),
})


export const { useCustomerCreateMutation, useGetCustomerQuery, useDeleteCustomerMutation } = customerAPI