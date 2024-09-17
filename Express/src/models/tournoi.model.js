import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Tournoi = sequelize.define('tournoi', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lieu: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateDeDebut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ageRequis: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Planifié', 'Pret', 'Terminé'),
        allowNull: false
    },
    minJoueurs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxJoueurs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre: {
        type: DataTypes.ENUM('M', 'F', 'X'),
        allowNull: false,
        defaultValue: 'X'
    }
})