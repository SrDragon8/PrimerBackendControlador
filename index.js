//todo esto es para crear nuestro primer controlador

//Iporting necessary libaries
const express = require('express'); /* llamar al objeto que invoca a la libreria express */
const bodyParser = require('body-parser');
const cors = require('cors');

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


// Tell app to listen for new cals and sleep when none are arriving
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`)); /* se queda dormida hasta que una request llegue, despues de terminar vuelve a dormir */