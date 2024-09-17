export const roleGuard = (...roles) => async (req, res, next) => {
    // si pas connecté
    if(!req.user) {
        // erreur 401
        res.status(401).json('Vous n\'etes pas connecté');
        return;
    }
    // si role ne convient pas
    if(!roles.includes(req.user.role)) {
        // erreur 403
        res.status(403).json('Vous n\'avez pas les droits nécéssaire pour effectué cette requète');
        return;
    } 
    // sinon
        // next()
    next();
}