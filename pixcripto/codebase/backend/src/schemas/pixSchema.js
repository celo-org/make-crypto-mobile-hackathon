const Joi = require('joi');

export const PixSchema = Joi.object({
    amount: Joi.number().required(),
    cpf: Joi.string().required()
});
