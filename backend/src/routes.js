const {Router} = require('express');
const axios    = require('axios');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// index, show, store, update, destroy

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/dev/:id/update', DevController.update);
routes.delete('/dev/:id/delete', DevController.destroy);


routes.get('/search', SearchController.index);

module.exports = routes;