import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { request, gql, ClientError } from 'graphql-request';
import { GetTransactions } from '../../types/sdk';

const graphqlBaseQuery = ({ baseUrl }: { baseUrl: string }) => async ({ body }: { body: string }) => {
	try {
		const result = await request(baseUrl, body);
		return { data: result };
	} catch (error) {
		if (error instanceof ClientError) {
			return { error: { status: error.response.status, data: error } };
		}
		return { error: { status: 500, data: error } };
	}
};

export const BlockScoutApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://explorer.celo.org/api'
	}),
	endpoints: (builder) => ({
		getTransactions: builder.query<GetTransactions, string>({
			query: (data) => ({
				url: `?module=account&action=tokentx&address=`+data
			})
		})
	})
});

export const { useGetTransactionsQuery, useLazyGetTransactionsQuery } = BlockScoutApi;
