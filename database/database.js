// const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes")


// const MONGODB_URL = 'mongodb+srv://Shivam_kushwaha:Shivam123@cluster0.rpkcw2e.mongodb.net/test';

exports.connect = () => {

const app = express();

app.use(express.json());


mongoose.connect('mongodb+srv://Shivam_kushwaha:Shivam123@cluster0.rpkcw2e.mongodb.net/test',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

    // console.log(typeof MONGODB_URL);
    // mongoose.connect(
    //     `mongodb+srv://Shivam_kushwaha:Shivam123@cluster0.rpkcw2e.mongodb.net/test?retryWrites=true&w=majority`, 
    //     {
    //       useNewUrlParser: true,
    //       useFindAndModify: false,
    //       useUnifiedTopology: true
    //     } )
    // .then(
    //     console.log(`DB connected Successfully`)
    // )
    // .catch((error) => {
    //     console.log(`DB connection FAILED`);
    //     console.log(error);
    //     process.exit(1)
    // })


}


