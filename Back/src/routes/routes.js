import { Router } from "express";
import { DefaultController } from "../controllers/default.controller.js";
import { TournoiController } from "../controllers/tournoi.controller.js";
import { InscriptionController } from "../controllers/inscription.controller.js";
import { JoueurController } from "../controllers/joueur.controller.js";
import { validationMiddelware } from "../middlewares/validation.middleware.js";
import { CreateJoueurBodySchema } from "../validations/create-joueur.body.schema.js";
import { CreateInscriptionBodySchema } from "../validations/create-inscription.body.schema.js";
import { CreateTournoiBodySchema } from "../validations/create-tournoi.body.schema.js";
import { CalculQuerySchema } from "../validations/calcul.query.schema.js";
import { LoginBodySchema } from "../validations/login.body.schema.js";
import { roleGuard } from "../middlewares/role.guard.js";
import multer from 'multer';

export const routes = Router();

// RESTFULL
// get -> récupération d'une ressource
// post -> ajout d'une ressource
// put / patch -> modification d'une ressource
// delete -> suppression d'une ressource
// head -> rerifier si une ressource existe

const upload = multer({ dest: './uploads' });

routes.route('/hello')
    .get(DefaultController.getHello)

routes.route('/calcul')
    .get(validationMiddelware(CalculQuerySchema, { validateQuery: true }), DefaultController.getCalcul)

routes.route('/tournoi')
    .get(TournoiController.index)
    .post(roleGuard('ADMIN'), validationMiddelware(CreateTournoiBodySchema), TournoiController.create)

routes.route('/tournoi/:id')
    .delete(roleGuard('ADMIN'), TournoiController.remove);

routes.route('/tournoi/:id/start')
    .patch(roleGuard('ADMIN') ,TournoiController.start)

routes.route('/inscription')
    .post(
        // middleware local
        /*(req, res, next) => { console.log('middleware local'); next(); }, */
        roleGuard('PLAYER', 'ADMIN'),
        validationMiddelware(CreateInscriptionBodySchema),
        InscriptionController.create 
    );

routes.route('/joueur')
    .post(
        upload.single('image'),
        validationMiddelware(CreateJoueurBodySchema),
        JoueurController.create
    );

routes.route('/joueur/:email')
        .head(JoueurController.exists);

routes.route('/login')
        .post(validationMiddelware(LoginBodySchema), JoueurController.login)
// http Request
// - headers (meta données de la requète)
// - body (données de la requètes)