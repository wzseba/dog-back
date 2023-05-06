require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require("axios");
const {PASS_API_KEY} = process.env;

//function deberia ir a un archivo por separado
async function getAllDogsApi(){
    //traigo solo los datos necesario de la api
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
   
    const arrayApiDogs = await apiData.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            temperament: dog.temperament,
            life_span: dog.life_span,
            image: dog.image.url
        }
    })
    
    return arrayApiDogs;
}

//funcion que busca todos los dogs de la base de datos junto con el temperament
async function getAllDogsDb(){

    const allDogs = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name']//atributos que quiero traer del modelo Temperament, el id lo trae automatico
        }
    })
    
    const dbFormateo = allDogs.map(dog => {
        return {
          id: dog.id,
          name: dog.name,
          height: dog.height,
          weight: dog.weight,
          temperament: dog.temperaments,
          life_span: dog.life_span,
          image: dog.image,
          createdInDb: dog.createdInDb
        }
      })
    
      const modificationTemperament = dbFormateo.map(dog => {
        if(Array.isArray(dog.temperament)) {
          dog.temperament = dog.temperament.map(t => t.name)
          dog.temperament = dog.temperament.join(", ")
        }
        return dog
      })
   

    return modificationTemperament
}

//funcion que junta lo dogs de la api y los dogs de database
async function getAllDogs(){
    const dataFromApi = await getAllDogsApi();
    const dataFromDb =  await getAllDogsDb();
    const allData = [...dataFromApi, ...dataFromDb];
    return allData;
}

/**RUTAS ENDPOINTS */

//rutas GET/dogs ** GET/dogs?name='raza de perro'
const getDogs = async (req, res, next) =>{
    try {

        const {name} = req.query;
        const allDogs = await getAllDogs();
       
        //busco una raza si se pasa por query sino devuelvo todo el arreglo de la api con los datos necesarios
        if (name) {
            const dogsFilter = allDogs.filter(d => d.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
            dogsFilter.length ? res.status(200).json(dogsFilter) : res.status(404).json({message:"Dog not found"}); 
        } else {
            res.status(200).json(allDogs);
        }

    } catch (error) {
        next(error);
        console.log(error);
    }
}

//rutas GET/dogs/:id
const getDogById = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const allDataDogs = await getAllDogs();
        
        const dogFound = allDataDogs.filter(dog => dog.id == id);//dejar con == para no tener errores
        
        dogFound.length ? res.json(dogFound) : res.json({message: "Dog no found in the Data Base"})

    } catch (error) {
        next(error);
        console.log(error);
    }
}

//rutas POST/dogs
const postDog = async (req,res,next)=>{
    try {
        const {name, maxheight, minheight, maxweight, minweight, lifeSpan, temperaments, image} = req.body;
        console.log(temperaments)
        //validaciones
        if(!name) return res.status(400).json({message: "No se ingreso name"});
        if(!maxheight) return res.status(400).json({message: "No se ingreso altura"});
        if(!minweight) return res.status(400).json({message: "No se ingreso peso"});
        if(!lifeSpan) return res.status(400).json({message: "No se ingreso esperanza de vida"});

        // console.log(tempArray);
        const dog = await Dog.create({
            name,
            height: `${minheight} - ${maxheight}`,
            weight: `${minweight} - ${maxweight}`,
            lifeSpan,
            image: image ? image : "https://w0.peakpx.com/wallpaper/594/867/HD-wallpaper-courage-the-cowardly-dog-cartoon.jpg"
        })

        const associatedTemperament = await Temperament.findAll({
            where:{
                name: temperaments
            }
        })
      
        //cuando hay asociaciones de models se puede utilizar mixins/metodos
        dog.addTemperament(associatedTemperament);

        res.json({message: "Dog created succesfully!"})
    } catch (error) {
        next(error);
        console.log(error);
        res.json({message: error})
    }
}

//ruta DELETE/dogs/:id
const deleteDog = async(req,res,next)=>{
    try {
        const {id} = req.params;
       
        const delDog = await Dog.destroy({
            where:{
                id
            }
        })

        delDog ? res.json({message: `Se elimino dog ${id}`}) : res.json({message: 'dog no se elimino'});

    } catch (error) {
        next(error)
        console.log(error);
        res.json({message: error});
    }
}

const updateDog = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {name,maxheight,maxweight,minheight,minweight,lifeSpan,temperament} = req.body;
        console.log(name);
        const upDog = await Dog.update({
            name,
            height: `${minheight} - ${maxheight}`,
            weight: `${minweight} - ${maxweight}`,
            lifeSpan,
            temperament
        },{
            where:{
                id
            }
        });

        upDog ? res.json({message: `updated successfully`}) : res.json({message: 'could not update'});

    } catch (error) {
        next(error);
        console.log(error);
        res.json({message: error});
    }
}

module.exports = {
    getDogs,
    getDogById,
    postDog,
    deleteDog,
    updateDog
}