import 'express-async-errors';
import express, { json } from "express";
import { routes } from "./routes/routes.js";

import "./models/db.js";
import "./models/tournoi.model.js";
import "./models/joueur.model.js";
import "./models/rencontre.model.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { jwtMiddleware } from './middlewares/jwt.middleware.js';
import cors from 'cors';

// initialisation de l'application serveur avec express 
const app = express();

// app.use(cors(/*{
//     origin: (o, cb) => {
//         if(['https://www.google.be', 'https://mojovelo.be'].includes(o)) {
//             cb(null, true)
//         } else {
//             cb(new Error())
//         }
//     }
// }*/));

app.use(cors());

app.use(express.static('./uploads'));

// permet à l'application de lire (désérialiser) du json
app.use(json());

// middleware global
app.use((req, res, next) => {
    console.log('je passe par ici');
    // next permet de passer à l'étape suivante
    next();
});

app.use(jwtMiddleware);

app.use(routes);

// le middleware de gestion d'erreurs se met toujours à la fin
app.use(errorMiddleware);

//écouter le port 3000
app.listen(3000, () => {
    console.log('listening port 3000');
});



// const commande = {
//     id: 42,
//     clientId: 5,
//     date: new Date(),
//     lignes: [
//         { prix: 5, quantite: 12 },
//         { prix: 2, quantite: 12 },
//         { prix: 1, quantite: 3 },
//     ]
// }

// class CommandeDTO {
//     constructor(commande) {
//         this.id = commande.id,
//         this.date = commande.date,
//         this.total = commande.lignes.reduce((acc, current) => 
//             acc + current.prix * current.quantite, 0
//         );
//         this.lignes = commande.lignes;
//     }
// }

// console.log(new CommandeDTO(commande))


// à voir
// express
    // migrations
    // socket
// angular + express
// nestjs ou mongodb