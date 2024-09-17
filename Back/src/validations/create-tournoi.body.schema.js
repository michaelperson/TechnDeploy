import yup from 'yup';
import { addDays } from '../utils/date.utils.js';

export const CreateTournoiBodySchema = yup.object({
    nom: yup.string().required().max(255).min(2),
    lieu: yup.string().max(255).min(2),
    dateDeDebut: yup.date().required().min(addDays(new Date(), 2)),
    ageRequis: yup.number(),
    minJoueurs: yup.number().required().min(2).max(16),
    maxJoueurs: yup.number().min(2).max(16).when('minJoueurs', (minJoueurs, schema) => 
        schema.min(minJoueurs)
    ),
    genre: yup.string().oneOf(['M', 'F', 'X']).required()
});