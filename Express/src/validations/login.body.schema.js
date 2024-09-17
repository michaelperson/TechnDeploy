import yup from 'yup';

export const LoginBodySchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
})