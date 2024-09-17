import { CreateJoueurDTO } from "../dto/joueur/create-joueur.dto.js";
import { Joueur } from "../models/joueur.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { smtpTransport } from "../utils/mail.utils.js";

dotenv.config();

const create = async(req, res) => {

    const joueur = req.parsedBody;
    const exists = await Joueur.findOne({ where: { email: joueur.email } });
    if(exists) {
        res.status(400).json({ message: 'Cet email est déjà utilisé' });
        return;
    }

    // await smtpTransport.sendMail({
    //     from: 'tf2023@khunly.be',
    //     to: joueur.email,
    //     subject: 'Nouvelle inscription',
    //     html: `<p>Bienvenue ${joueur.nom} ${joueur.prenom} !!</p>`
    // })
    
    const result = await Joueur.create({ 
        ...joueur,
        image: req.file?.filename /*req.file !== null ? req.file.filename : null*/ ,
        hashedPassword: await bcrypt.hash(joueur.password, await bcrypt.genSalt()),
        role: 'PLAYER'
    });
    res.json(new CreateJoueurDTO(result));

}

const login = async(req, res) => {
    const { email, password } = req.parsedBody;
    const joueur = await Joueur.findOne({ where: { email } });
    if(!joueur || !await bcrypt.compare(password, joueur.hashedPassword)) {
        res.status(401).json({ message: 'Bad Credentials' });
        return;
    }
    const payload = {
        id: joueur.id,
        email: joueur.email,
        role: joueur.role
    };
    const token = jwt.sign(
        payload, // payload
        process.env.JWT_SECRET, // secret
        { expiresIn: process.env.JWT_DURATION } // options
    );
    res.json({ token });
}

const exists = async(req, res) => {
    const { email } = req.params;
    const j = await Joueur.findOne({ where: { email } });
    if(j) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}

export const JoueurController = { create, login, exists };

// créer dans joueurController une route login (post)
// body => { email: '', password: '' }
// vérifier à l'aide de la méthode compare de bcrypt si la combinaison 
// email/password est valide
// renvoyer true ou false


// smtp (simple mail transport protocol) envoi d'email
// port: 25, 465 (ssl), 587 (tls)
// host: ssl0.ovh.net
// email: tf2023@khunly.be
// password: test1234=
// pop3 (deprecated) ou imap recupération des emails

// créer une methode supprimer un tournoi
// on ne peut supprimer un tournoi qui a déjà commencé
// si le tournoi est supprimé envoyé un email à tous les joueurs inscrits pour les prévenir