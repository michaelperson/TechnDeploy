import yup from 'yup';

export const CreateJoueurBodySchema = yup.object({
    nom: yup.string().required().min(2).max(255),
    prenom: yup.string().required().min(2).max(255),
    dateDeNaissance: yup.date().required().max(new Date()),
    genre: yup.string().required().oneOf(['M', 'F', 'X']),
    email: yup.string().required().email().max(255),
    password: yup.string().required()
})