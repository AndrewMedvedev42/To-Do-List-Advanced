require('dotenv').config()
const mongoose = require('mongoose');

const ToDo = require('./models/user.model')

const jsonUsers = require('./users.json')

const uri = process.env.CLUSTER_URI;

const start = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify:false,}
    );
    await ToDo.deleteMany()
    await ToDo.create(jsonUsers)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()