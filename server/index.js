'use strict';

const express = require('express');
const morgan = require('morgan');
const DAO = require('./DAO');
const cors = require('cors');
const {param, body, validationResult} = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init express
const app = new express();
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: "I hope this exam goes well...",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, {email: user.username, name: user.name, surname: user.surname, fulltime: user.fulltime});
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

passport.use(new LocalStrategy( function verify (username, password, callback) {
  DAO.getUser(username, password).then((user) => {
      if (!user)
          return callback(null, false, {message: 'Incorrect username and/or password.'});
      return callback(null, user);
  });
}));

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
      return next();
  return res.status(400).json({message : "not authenticated"});
}


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

app.get('/api/students/courses', isLoggedIn, async (req, res) => {
  try{
    const result = await DAO.getStudyPlanCourses(req.user.email);
    return res.status(200).json(result);
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/students/compatibleCourses', isLoggedIn, async (req, res) => {
  try{
    const result = await DAO.getCompatibleCourses(req.user.email);
    return res.status(200).json(result);
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

/*app.post('/api/students/courses', isLoggedIn, body('courseCode').isLength(7), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.addCourseToStudyPlan(req.body.courseCode, req.user.email);
    return res.status(201).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});*/

/*app.delete('/api/students/courses/:code', isLoggedIn, param('code').isLength(7), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.deleteCourseFromStudyPlan(req.params.code, req.user.email);
    return res.status(204).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});*/

app.post('/api/students/courses', isLoggedIn, body().isArray(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.addStudyPlan(req.body, req.user.email);
    return res.status(201).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});

app.put('/api/students', isLoggedIn, body('fulltime').exists(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const result = await DAO.updateFullTimeStudent(req.body.fulltime, req.user.email);
    //Updated user session in order to include the changes related to study plan category, so that refreshing the page leads to a consistent behavior
    req.session.passport.user.fulltime = req.body.fulltime;
    return res.status(200).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});

app.delete('/api/students/courses', isLoggedIn, async (req, res) => {
  try{
    const result = await DAO.deleteStudyPlan(req.user.email);
    return res.status(204).end();
  }catch(err){
    console.log(err);
    return res.status(503).end();
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

app.delete('/api/logout', (req, res) => {
  req.logout(() => {
      res.end();
  });
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});