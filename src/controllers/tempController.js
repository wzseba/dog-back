const axios  = require('axios');
const { Temperament } = require('../db');
const { PASS_API_KEY } = process.env;

const getTemperaments = async (req,res,next)=>{
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${PASS_API_KEY}`);
        const temperamentsFromAPI = response.data.map(breed => breed.temperament);
        const uniqueTemperaments = [...new Set(temperamentsFromAPI.flatMap(temp => temp?.split(',').map(t => t.trim())))];

        await Promise.all(uniqueTemperaments.map(async temperament => {
            if (temperament) {
                await Temperament.findOrCreate({
                    where: { name: temperament }
                });
            }
        }));

        const tempClean = await Temperament.findAll();

        res.send(tempClean);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    getTemperaments
}
