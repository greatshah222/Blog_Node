const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./../models/usermodel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected for importing or deleting data 💣');
  });

const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const importData = async () => {
  try {
    await User.create(user, { validateBeforeSave: false });
    console.log('database imported succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('database deleted succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
