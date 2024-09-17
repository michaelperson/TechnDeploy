import yup from 'yup';
export const CreateInscriptionBodySchema = yup.object({
    tournoiId: yup.number().required(),
    joueurId: yup.number().required(),
});