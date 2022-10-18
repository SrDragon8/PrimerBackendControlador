//api que permite conectarse facil con mongodb

const { default: mongoose } = require('mongoose');
const mongose = require('mongoose'); /* declarar la estructura que tendra un objeto en particular */
const Schema = mongoose.Schema;

//pedir una estructura para el esquema de forma obligatoria, internamente le vamos a decir que solo va a aceptar cosas con relación a lo de dentro 
const Movie = new Schema(
    {
    name: {type : String, required: true },
    time: {time: [String], required: true},
    raiting: {raiting: Number, required: true},
    },
    {timestamps: true } /* la fecha de modificacion o agregado */
);

module.exports = mongoose.model('movies', Movie); /* nombre de esquema y esquema, exportando el modelo, al usar node se exporta de esta manera */