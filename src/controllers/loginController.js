const {User} = require('../db');//en proceso de desarrollo

const formLogin = async(req,res,next)=>{

    try {
        const {email, password} = req.body;

        console.log("Estoy en el controller login" + email + " " + password);
    } catch (error) {
        
    }
}

module.exports = {
    formLogin
}