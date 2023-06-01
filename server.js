const express = require("express")                    //Load Express
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')   
const db =mongoose.connection
const Movie = require("./models/movies")
const moviesData = require("./views/data")
const moviesController = require("./controllers/movies")

//Instantiate express
const app = express();
//Other variables
const port = 3000;

//Connecting to MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//Error
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());             //use .json(), not .urlencoded()
app.use(express.static("public"))    // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors({origin:"*"}))          // used to whitelist requests

//Routes
app.use("/movies", moviesController)  // telling server.js to get the routes from controllers/movies.js


app.get("/", (req,res) =>{
  res.send("<h1>Welcome to movie database</h1>");
  })

//Seeding the DB
app.get('/seed', async (req, res) => {
    await Movie.deleteMany({});
    await Movie.insertMany(moviesData);
    res.send('done!');
  });

app.listen(port, () => {
    console.log('U better connect', port)
  })