const mongoose = require('mongoose');
require('dotenv').config();

 const dbURL = process.env.mongodb_URL;
 mongoose.connect(dbURL);
 

const db = mongoose.connection;

db.on('connected' , ()=>{
  console.log('MonogoDB Connection Successfully ')
});

db.on('error' , (err)=>{
  console.log('Internal error ')
});

db.on('disconnected' , ()=>{
  console.log('MongoDB server disconnected')
});

module.exports = db;