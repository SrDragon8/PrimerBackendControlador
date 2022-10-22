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

//Creating swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


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
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Structure of movie to be created. This doesn\'t need to have an id yet as the db will be generating it for us',
                schema: {
                    $name: 'Avatar',
                    $author: 'James Cameron',
                    time: ['20:00', '22:00'],
                    rating: 5.00
                }
        }
        #swagger.responses[200] = {
                description: 'Movie successfully obtained.',
                schema: { $ref: '#/definitions/Movie' }
        }
        #swagger.responses[500] = {
                description: 'Error.',
                schema: { $ref: '#/definitions/GenericError' }
        }
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        */

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

//READ
app.get('/get-movie/:id', async (req, res) =>{
    try{
        const { params : {id} } = req;
        const moviesDB= db.collection('movies').doc(id);
        const { _fieldsProto: { time, author, name, raiting}} = await moviesDB.get();


        console.log('time', time.stringValue);

        res.send({
        status: 200,
        time : time.stringValue,
        author : author.stringValue,
        name: name.stringValue,
        raiting: raiting.stringValue
    })
    }catch(error){
        res.send(error);
    }finally{

    }
})

//DELLETE
app.delete('/delete-movie/:id', async(req, res)=> {
     try{
        const { params : {id} } = req;
        const movieDB= db.collection('movies').doc(id);
        await movieDB.delete();

        res.send({
        status: 200,
    })
    }catch(error){
        res.send(error);
    }
});



//Update

app.put('/update-movie', async (req, res) => 
{
    try {   
        const { body: movie } = req;
        const { id, time, author, name, raiting} = movie;
        const movieDB = db.collection('movies').doc(id);
        movieDB.update({
            name,
            time,
            raiting,
            author
        });

        res.send({
            status: 200,
            id,
        });
    }catch (error){
        res.send(error);
    }

})


//get movies
app.get('/get-movies', async (req, res) => 
{
    try{
        const moviesDB= await db.collection('movies').get();
        const resp = moviesDB.docs.map(doc =>doc.data());

        //en lugar de traer solo uno trae todos
        res.send({
        resp
    })
    }catch(error){
        res.send(error);
    }finally{

    }
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Tell app to listen for new cals and sleep when none are arriving
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`)); /* se queda dormida hasta que una request llegue, despues de terminar vuelve a dormir */
