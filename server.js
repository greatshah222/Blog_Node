const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💣 Shutting Down....');
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const port =  3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected');
  });

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
