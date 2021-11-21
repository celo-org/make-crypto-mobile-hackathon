const Joi = require('joi');

export const RegisterSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})