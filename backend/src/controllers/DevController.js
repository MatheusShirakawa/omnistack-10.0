const axios    = require('axios');
const Dev      = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index (request,response){

        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response){

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio} = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type:'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

        }
    
        return response.json({dev});    
    },

    async update(request, response){
        
        const dev = await Dev.findById(request.params.id);
        // const post = await Post.findById(req.params.id);
        const { name, techs, latitude, longitude, avatar_url, bio } = request.body;
        const techsArray = parseStringAsArray(techs);
        // console.log(request.body);
        const location = {
            type:'Point',
            coordinates: [longitude, latitude],
        }
        // dev = {
        //     name,
        //     avatar_url,
        //     bio,
        //     techs: techsArray,
        //     location
        // };
    
        dev.name = name;
        dev.avatar_url = avatar_url;
        dev.bio = bio;
        dev.techs = techsArray;
        dev.location = location;

        await dev.save();

        return response.json({dev});

    },

    async destroy(request, response){

        const dev = await Dev.findById(request.params.id);
        dev.remove();

        let result = dev.$isDeleted;
        
        return response.json({result});
    }
}