const axios  = require('axios');
const { Temperament } = require('../db');
const { PASS_API_KEY } = process.env;

const getTemperaments = async (req,res,next)=>{
    try {
        //obtengo solo los temperamentos de la api
        const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${PASS_API_KEY}`);
        //array de temperamentos
        const tempData = temperamentsApi.data.map(t => t.temperament);
        // console.log(temperaments);
        //primero convierto todo el arreglo de en una sola cadena despues convierto a un array seperando cada elemento con split(',')
        const temps = tempData.toString().split(',');
        
        temps.forEach(element => {
            if(element){
                let i = element.trim();
                 //agrego elementos sin espacios vacios al model Temperament
                Temperament.findOrCreate({
                    where: { name: i }
                })
            }
        });
        
        const tempClean = await Temperament.findAll();
        
        res.send(tempClean);

    } catch (error) {
        next(error);
        console.log(error);
        res.json({message: error})
    }
}

module.exports = {
    getTemperaments
}