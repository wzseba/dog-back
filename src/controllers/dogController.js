const { Dog } = require('../db');
const axios = require("axios");
const {PASS_API_KEY} = process.env;

const getDogs = async (req, res) =>{
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${PASS_API_KEY}`);
    console.log(apiData);
}

module.exports = {
    getDogs
}