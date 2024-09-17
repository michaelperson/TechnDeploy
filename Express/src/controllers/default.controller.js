import { CalculDTO } from "../dto/default/calcul.dto.js";
import { CalculQuerySchema } from "../validations/calcul.query.schema.js";

const getHello = (req, res) => {
    const { name, lang } = req.query;
    if(lang === 'fr') {
        res.send('Bonjour ' + name + ' !!!');
    } else if (lang === 'sp') {
        res.send('Ola ' + name + '!!!');
    } else {
        res.send('Hello ' + name + ' !!!');
    }
}

const getCalcul = async (req, res) => {
    const query = await CalculQuerySchema.validate(req.query, { abortEarly: false });
    res.json(new CalculDTO(query.nb1, query.nb2));
}

export const DefaultController = { getHello, getCalcul };

// 400 Bad request => les données sont incorrectes
// 401 Unauthorized => il faut être connecté pour effectué l'opération
// 403 Forbid => vous n'avez pas le droit de faire cette opération 
// 404 NotFound => ressource introuvable
// 405 Method not allowed
// 418 I'm a teapot