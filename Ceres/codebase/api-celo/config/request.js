const axios = require('axios');

module.exports = axios.create({
	baseURL: process.env.API_URL_REGISTER_TRANSACTIONS,

	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
        'Authorization' :`Bearer ${process.env.TOKEN_AUTHORIZATION}`
	}
});