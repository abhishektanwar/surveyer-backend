//here in line 4 we are using commonjs modules
// commonjs is a system implemented in nodejs for requiring and sharing
// code b/w different files
const express = require('express');

// import express from 'express' -> this uses ES2015/ES6 modules, nodejs does not have
// support for ES2015 modules
// there could be multiple apps aswell 
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' })
});

const PORT = process.env.PORT || 5000;
// express listening for requests on post 5000
app.listen(PORT);