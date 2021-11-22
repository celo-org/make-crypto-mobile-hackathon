const Joi = require('joi');

export const SaldoSchema = Joi.object({
    cpf: Joi.string().required()
});
