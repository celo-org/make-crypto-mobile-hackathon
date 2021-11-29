import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../../utility/const'
import { GetBalanceResponse, SendCelo, SendCeloResponse, SendStableToken, SendStableTokenResponse, SendMultipleTransaction, SendAltcoin, SendAltcoinResponse, GetCurrencies } from '../../types/sdk'
import { RootState } from '../store';

export const transactionAPI = createApi({
    reducerPath: 'transactionAPI',
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
        getBalance: builder.query<GetBalanceResponse, void>({
            query: () => ({
                url: '/transaction/balance',
            })
        }),
        getCurrencies: builder.query<GetCurrencies, void>({
            query: () => ({
                url: '/transaction/currency',
            })
        }),
        sendCelo: builder.mutation<SendCeloResponse, SendCelo>({
            query: (data) => ({
                url: '/transaction/sendCelo',
                method: 'POST',
                body: data,
            })
        }),

        sendStableToken: builder.mutation<SendStableTokenResponse, SendStableToken>({
            query: (data) => ({
                url: '/transaction/sendStableCoin',
                method: 'POST',
                body: data,
            })
        }),
        sendAltToken: builder.mutation<SendAltcoinResponse, SendAltcoin>({
            query: (data) => ({
                url: '/transaction/sendAltCoin',
                method: 'POST',
                body: data,
            })
        }),
        sendMultipleTransactions: builder.mutation<void, SendMultipleTransaction>({
            query: (data) => ({
                url: '/transaction/multipleTran',
                method: 'POST',
                body: data,
            })
        })
    }),
})


export const { useGetBalanceQuery, useGetCurrenciesQuery,  useSendCeloMutation, useSendStableTokenMutation, useSendAltTokenMutation, useSendMultipleTransactionsMutation } = transactionAPI