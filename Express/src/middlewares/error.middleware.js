export const errorMiddleware = (error, req, res, next) => {
    if(error) {
        switch(error.constructor.name) {
            case 'BusinessError':
                res.status(error.code).json({message: error.message}) 
                break;
            // handle other errors here
            default:
                res.status(500).send('Erreur inconnue');
                // log error here
                throw error;
        }
    }
}