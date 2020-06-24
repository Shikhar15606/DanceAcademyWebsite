const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const contact = require('./contact')

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// MONGODB SPECIFIC STUFF
const url = 'mongodb+srv://Shikhar:vijay546@cluster0-f8y30.mongodb.net/<dbname>?retryWrites=true&w=majority';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});

// ENDPOINTS
app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('index.pug', params);
})
app.get('/about', (req, res) => {
  const params = {}
  res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
  const params = {}
  res.status(200).render('services.pug', params);
})
app.get('/info', (req, res) => {
  const params = {}
  res.status(200).render('info.pug', params);
})
app.get('/contact', (req, res) => {
  const params = {
    eprob: 0,
    pprob: 0,
    done: 0
  }
  res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
  contact.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user != null) {
        const params = {
          eprob: 1,
          pprob: 0,
          done: 0
        }
        res.status(200).render('contact.pug', params);
      } else {
        contact.findOne({
            phone: req.body.phone
          })
          .then((user1) => {
            if (user1 != null) {
              const params = {
                eprob: 0,
                pprob: 1,
                done: 0
              }
              res.status(200).render('contact.pug', params);
            } else {
              return contact.create({
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
              });
            }
          })
          .then((user) => {
            {
              const params = {
                eprob: 0,
                pprob: 0,
                done: 1
              }
              res.status(200).render('contact.pug', params);
            }
          }, (err) => next(err))
      }
    })
    .catch((err) => next(err));
})

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});