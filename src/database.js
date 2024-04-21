const mongoose =  require('mongoose');

const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE}= process.env;
const MONGODB_URI = 'mongodb://localhost:27017/pruebatecnica';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
