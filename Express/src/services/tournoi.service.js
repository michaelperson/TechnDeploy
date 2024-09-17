import { Transaction } from "sequelize";
import { BusinessError } from "../errors/business.error.js";
import { Tournoi } from "../models/tournoi.model.js";
import { yearDiff } from "../utils/date.utils.js";
import { smtpTransport } from "../utils/mail.utils.js";
import { sequelize } from "../models/db.js";

const start = async (tournoi) => {

    if(tournoi.status !== 'Planifié') {
        throw new BusinessError('Le tounoi a déjà démarré');
    }
    if(tournoi.dateDeDebut > new Date()) {
        throw new BusinessError('Les inscriptions sont toujours ouvertes');
    }
    if(tournoi.joueurs.length < tournoi.minJoueurs) {
        throw new BusinessError('Pas assez de joueurs');
    }

    tournoi.status = 'Pret';
    return await tournoi.save();
    // return await Tournoi.update(tournoi, { where: { id: tournoi.id } });
}

const register = async (tournoi, joueur) => {
    if(tournoi.status !== 'Planifié') {
        throw new BusinessError('Le tournoi a déjà commencé ou est terminé');
    }
    if(tournoi.joueurs.length >= tournoi.maxJoueurs) {
        throw new BusinessError('Le tournoi est complet');
    }
    if(tournoi.joueurs.find(j => j.id === joueur.id)) {
        throw new BusinessError('Le joueur est déjà inscrit');
    }
    if(tournoi.genre !== 'X' && tournoi.genre !== joueur.genre) {
        throw new BusinessError('Les genres ne correspondent pas');
    }
    if(tournoi.ageRequis && yearDiff(joueur.dateDeNaissance, tournoi.dateDeDebut) < tournoi.ageRequis) {
        throw new BusinessError('Age invalide');
    }
    return await tournoi.addJoueur(joueur);
} 

const remove = async (tournoi) => {
    if(tournoi.status !== 'Planifié') {
        throw new BusinessError('Impossible de supprimé un tournoi qui a déjà commencé');
    }

    const transaction = await sequelize.transaction();
    try {
        const result = await Tournoi.destroy({ 
            where: {id: tournoi.id}, 
            transaction: transaction
        });
        await smtpTransport.sendMail({
            from: 'tf2023@khunly.be',
            to: tournoi.joueurs.map(j => j.email),
            subject: 'Tournoi annulé',
            html: `<p>Le tournoi ${ tournoi.nom } est annulé !!</p>`
        });
        await transaction.commit();
        return result;
    }catch(error) {
        await transaction.rollback();
        throw error;
    }

   
}

export const TournoiService = { start, register, remove }


// créer un controller JoueurController avec une méthode create, pour créer un joueur
// créer un controller InscriptionController avec une méthode pour incrire 
// un joueur peut s'inscrire
// si il a l'age requis, si il a le genre requis, si le tournoi n'a pas encore commencé, 
// si le tournoi n'est pas complet 