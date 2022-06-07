'use strict';

const express = require('express');
const morgan = require('morgan');
const DAO = require('./DAO');
const cors = require('cors');
const {check, param, validationResult} = require('express-validator');

// init express
const app = new express();
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200/*,
  credentials: true*/
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.get('/api/courses', async (req, res) => {
  try{
    const result = await DAO.getAllCourses();
    return res.status(200).json(result);
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/courses/:code', param('code').isLength(7), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.getCourseByCode(req.params.code);
    if(result.length === 0){
      return res.status(404).end();
    }else{
      return res.status(200).json(result);
    }
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});