import { TournoiDTO } from "../dto/tournoi/tournoi.dto.js";
import { Joueur } from "../models/joueur.model.js";
import { Tournoi } from "../models/tournoi.model.js"
import { TournoiService } from "../services/tournoi.service.js";

const index = async (req, res) => {
    const tournois = (await Tournoi.findAll({
        where: req.query,
        include: [ Joueur ],
    })).map(t => new TournoiDTO(t));
    
    res.json(tournois);
}

const create = async (req, res) => {

    const tournoi = req.parsedBody;
    const result = await Tournoi.create({ 
        ...tournoi,
        status: 'Planifié',
        maxJoueurs: tournoi.maxJoueurs ?? tournoi.minJoueurs
    });
    res.json(result);
}

const remove = async(req, res) => {
    const { id } = req.params;
    const tournoi = await Tournoi.findByPk(id, {
        include: [Joueur]
    });
    if(!tournoi) {
        res.status(404).send('Ce tournoi n\'existe pas');
        return;
    }

    const result = await TournoiService.remove(tournoi);
    res.json(result);
}

const start = async (req, res) => {
    const { id } = req.params;
    const tournoi = await Tournoi.findByPk(id, {
        include: [Joueur]
    });
    if(!tournoi) {
        res.status(404).send('Ce tournoi n\'existe pas');
        return;
    }
    const result = await TournoiService.start(tournoi);
    res.json(result);
}

export const TournoiController = { index, create, start, remove }