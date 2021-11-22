const Joi = require('joi');

export const WithdrawSchema = Joi.object({
    address: Joi.string().required(),
    amount: Joi.number().required(),
    cpf: Joi.string().required()
});
