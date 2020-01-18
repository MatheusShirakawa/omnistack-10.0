const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');

const app      = express();

//Metodos http get, post, put, delete

// Query Params: request.query (Filtros, ordenação, paginação ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criacao ou alteracao de um registro)

mongoose.connect('mongodb://127.0.0.1/ominstack10',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(express.json());
app.use(routes);

app.listen(3333);