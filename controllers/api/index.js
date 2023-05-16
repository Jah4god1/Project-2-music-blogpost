//TANNER
const Song = require('../models/song');

exports.getSongs = (req, res) => {
  Song.findAll()
    .then((songs) => {
      res.json(songs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.addSong = (req, res) => {
  const { title, artist, album, year } = req.body;

  Song.create({
    title,
    artist,
    album,
    year,
  })
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
