const mysql = require('mysql');
const util = require('util');
const multer = require('multer');
const path = require('path');
const sequelize = require('./config/database');
const { sessionSecret } = require('./config/auth');


// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'music_app',
});

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  },
}).single('image');

// Wrap the pool's getConnection function in a Promise
pool.getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

exports.getConnection = async () => {
  const connection = await pool.getConnectionAsync();
  connection.queryAsync = util.promisify(connection.query).bind(connection);

  // Override the connection's query function to automatically upload files
  const originalQuery = connection.query;
  connection.query = (sql, values, callback) => {
    upload(null, null, (err) => {
      if (err) {
        return callback(err);
      }

      originalQuery.call(connection, sql, values, callback);
    });
  };

  return connection;
};

// Sync the database models
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
  }).catch((err) => {
    console.error('Error syncing database:', err);
  });
  
  exports.getConnection = (callback) => {
    // ...
  };
  