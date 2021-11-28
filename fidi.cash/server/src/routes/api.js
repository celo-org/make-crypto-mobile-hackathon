import express from 'express';
import offers from './offers.js';
import deals from './deals.js';
import users from './users.js';
import profile from './profile.js';

const api = express.Router();

api.use('/offers', offers);
api.use('/deals', deals);
api.use('/users', users);
api.use('/profile', profile);

export default api;
