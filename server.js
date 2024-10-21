const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
require('dotenv').config();
const stockRoutes = require('./routes/stockRoutes');

app.use(bodyParser.json());
const PORT = process.env.PORT || 4000

app.get('/' , (req, res)=>{
  res.send('Welcome to Homepage');
});

app.use('/api/stocks' , stockRoutes);

// activation server
app.listen(PORT , ()=>{
  console.log(`Server Started at port on ${PORT}`);
});