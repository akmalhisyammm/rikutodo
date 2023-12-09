const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Todo = require('../src/models/todoModel');
const User = require('../src/models/userModel');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((err) => {
    console.log('Error with code: ', err);
  });

const todos = JSON.parse(fs.readFileSync(`${__dirname}/todos.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await User.create(users);
    await Todo.create(todos);

    console.log('Data has been successfully inserted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();

    console.log('Data has been successfully deleted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(
    'Please use the --import or --delete flag to import or delete data. Example: node mocks/migrate --delete',
  );
}
