import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { Tournoi } from "./tournoi.model.js";
import { Joueur } from "./joueur.model.js";


export const Rencontre = sequelize.define('rencontre', {
    tournoiId: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    joueur1Id: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    joueur2Id: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ronde: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resultat: {
        type: DataTypes.ENUM('J1', 'J2', 'Egalite'),
        allowNull: true
    }
});

Rencontre.belongsTo(Tournoi);
Tournoi.hasMany(Rencontre);

Rencontre.belongsTo(Joueur, { foreignKey: 'joueur1Id' });
Joueur.hasMany(Rencontre, { foreignKey: 'joueur1Id' });

Rencontre.belongsTo(Joueur, { foreignKey: 'joueur2Id' });
Joueur.hasMany(Rencontre, { foreignKey: 'joueur2Id' });

