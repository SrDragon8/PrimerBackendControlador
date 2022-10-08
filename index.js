//todo esto es para crear nuestro primer controlador

//Iporting necessary libaries
const express = require('express'); /* llamar al objeto que invoca a la libreria express */
const bodyParser = require('body-parser');
const cors = require('cors');

var firebase = require("firebase-admin");

var serviceAccount = require("./kei.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

//Create db and a collection within it
const db = firebase.firestore();
/* lo equivalente a una tabla */
const moviesDB = db.collection('movies');

//Creating express app
const app = express();
const apiPort = 3003;

//Setting up express app
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());  /* decirle al navegador que es seguro y se encarga corps */
app.use(bodyParser.json());/* todo lo que le llegue al body lo caste para json */

//Creating endpoint
app.get('/', (req, res) => 
{
    res.send('Hello World');
})

//CRUD
//CREATE READ UPDATE DELETE

//CREATE
//Create Movie
//create es el path
app.post('/create', async (req, res) => 
{
    try {    //el (1) es el id
        const { body: movie } = req;
        const moviesDB = db.collection('movies');
        // const resp = moviesDB.doc({id}).set(movie)
        //el id necesita ser único, el front end puede crear uno y usar ese o que la base de datos lo haga
        //const resp = await moviesDB.add(movie);
        const {_path: {segments} } = await moviesDB.add(movie);
        const id = segments[1];
        res.send({
            status: 200,
            id,
            message: "All cool"
        });
    }catch (error){
        res.send(error);
    }

})

// Tell app to listen for new cals and sleep when none are arriving
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`)); /* se queda dormida hasta que una request llegue, despues de terminar vuelve a dormir */