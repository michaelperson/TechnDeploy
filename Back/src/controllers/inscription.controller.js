import { Joueur } from "../models/joueur.model.js";
import { Tournoi } from "../models/tournoi.model.js";
import { TournoiService } from "../services/tournoi.service.js";

const create = async(req, res) => {
    const inscription = req.parsedBody;
    const tournoi = await Tournoi.findByPk(inscription.tournoiId, {
        include: [Joueur]
    });

    if(req.user.role !== 'ADMIN' && req.user.id !== inscription.joueurId) {
        res.status(403).json({ message: 'Vous ne pouvez inscrire ce joueur' });
        return;
    }

    const joueur = await Joueur.findByPk(inscription.joueurId);

    if(!tournoi || !joueur) {
        res.status(400).json({ message: 'Joueur ou Tournoi introuvable' });
        return;
    }
    const result = await TournoiService.register(tournoi, joueur);
    res.json(result);
}

export const InscriptionController = { create };