const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports ={
    async index (request,response){
        console.log(request.query);

        const { latitude , longitude, techs } = request.query;

        const lowTechs = techs.toLowerCase();
        const techsArray = parseStringAsArray(lowTechs);

        const devs = await Dev.find({
            techs: {
                $in:techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance:10000,
                },
            },
        });

        console.log(techsArray);
        console.log(devs);
        //buscar todos devs num raio 10km
        //filtrar por tecnologias

        return response.json({ devs});
    }
}