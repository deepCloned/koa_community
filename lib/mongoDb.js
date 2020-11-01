const mongoose = require('mongoose');

const initMongoDb = () => {
  mongoose.connect('mongodb://localhost/community', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection

  db.on('error', () => {
    console.error('Connection error!');
  });

  db.once('open', () => {
    console.info('Connect to mongodb is Ok!');
  });
}

module.exports = initMongoDb;
