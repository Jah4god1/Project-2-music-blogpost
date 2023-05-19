const path = require('path'); //UTILITIES directory paths
const express = require('express'); // EXPRESS.JS import
const exphbs = require('express-handlebars');// RENDER HTML views
const routes = require('./controllers'); // HANDLES routes for endpoints
const helpers = require('./utils/helpers'); // HANDLES custom helper for hbs
const sequelize = require('./config/connection'); //CONNECTION sequelize db

//CREATE instance & PORT/default val
const app = express();
const PORT = process.env.PORT || 3001;

// CREATE Handlebars.js object using custom helpers
const hbs = exphbs.create({ helpers });

// NOTIFY Express.js of template selection
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//MIDDLEWARE config
app.use(express.json());//PARSE w/ INCOMING REQUESTS
app.use(express.urlencoded({ extended: true }));// PARSE w/ URL-encoded- Result=object on req.body.
app.use(express.static(path.join(__dirname, 'public'))); //STATIC file server
app.use('/images', express.static('images')); // SERVE static images from the 'images' folder

app.use(routes); //REGISTER defined routes

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


