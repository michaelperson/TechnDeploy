export class CalculDTO {
    constructor(nb1, nb2) {
        this.somme = nb1 + nb2;
        this.difference = nb1 - nb2;
        this.produit = nb1 * nb2;
        this.quotient = nb1 / nb2;
        this.puissance = nb1 ** nb2;
    }
}