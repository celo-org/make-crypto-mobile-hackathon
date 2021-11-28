import { API } from './config';
const axios = require('axios');

// we communicate with backend from here
// Backend was only used strinctly for username and password, nothing else

export const posts = async() => {
  const response = await axios.get('/.netlify/functions/posts')
  .then(result => (result.data))
  .catch(error => console.log(error))

  return response;
}

// export const getBraintreeClientToken = (userId, token) => {
//   return fetch(`${API}/braintree/getToken/${userId}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   })
//   .then(result => result.json())
//   .catch(error => console.log(error));
// }

// export const processPayment = (userId, token, paymentData) => {
//   return fetch(`${API}/braintree/payment/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(paymentData)
//   })
//   .then(result => result.json())
//   .catch(error => console.log(error));
// }
