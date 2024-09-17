export class TournoiDTO {
    constructor(tournoi) {
        this.id = tournoi.id;
        this.nom = tournoi.nom;
        this.lieu = tournoi.lieu;
        this.genre = tournoi.genre;
        this.status = tournoi.status;
        this.minJoueurs = tournoi.minJoueurs;
        this.maxJoueurs = tournoi.maxJoueurs;
        this.nbJoueurs = tournoi.joueurs?.length;
        this.dateDeDebut = tournoi.dateDeDebut;
    }
}