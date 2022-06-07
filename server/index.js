'use strict';

const express = require('express');
const morgan = require('morgan');
const DAO = require('./DAO');
const cors = require('cors');
const {check, param, body, validationResult} = require('express-validator');

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
      return res.status(200).json(result[0]);
    }
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

//I will protect this API so that only the logged user can access it and I'll use credentials in order to retrieve the email address
app.get('/api/students/:email/courses', param('email').isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.getStudyPlanCourses(req.params.email);
    return res.status(200).json(result);
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

//As before I'll retrieve the email from logged user session
app.get('/api/students/:email/compatibleCourses', param('email').isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.getCompatibleCourses(req.params.email);
    return res.status(200).json(result);
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

//As before I'll retrieve the email from logged user session
app.post('/api/students/:email/courses', param('email').isEmail(), body('courseCode').isLength(7), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.addCourseToStudyPlan(req.body.courseCode, req.params.email);
    return res.status(201).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});

//As before I'll retrieve the email from logged user session
app.delete('/api/students/:email/courses/:code', param('email').isEmail(), param('code').isLength(7), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.deleteCourseFromStudyPlan(req.params.code, req.params.email);
    return res.status(204).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});

// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});