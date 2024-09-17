import yup from 'yup';

export const CalculQuerySchema = yup.object({
    nb1: yup.number().required('Le champs nb1 est requis'),
    nb2: yup.number().required('Le champs nb2 est requis'),
})