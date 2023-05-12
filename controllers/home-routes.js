const Song = require('../models/song');

exports.getIndex = (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
  });
};
