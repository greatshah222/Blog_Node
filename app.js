const express = require('express');
const path = require('path');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//app.use('/api/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
