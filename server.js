const path = require('path'); //UTILITIES directory paths
const express = require('express'); // EXPRESS.JS import
const exphbs = require('express-handlebars');// RENDER HTML views
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers'); // HANDLES routes for endpoints
const sequelize = require('./config/connection'); //CONNECTION sequelize db

//CREATE instance & PORT/default val
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// NOTIFY Express.js of template selection
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: "main" })
);

//MIDDLEWARE config
app.use(express.json());//PARSE w/ INCOMING REQUESTS
app.use(express.urlencoded({ extended: true }));// PARSE w/ URL-encoded- Result=object on req.body.
app.use(express.static(path.join(__dirname, 'public'))); //STATIC file server


app.use(routes); //REGISTER defined routes

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: 'An unexpected error occurred' });
// });

//Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});


