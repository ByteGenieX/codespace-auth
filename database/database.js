const mongoose = require("mongoose")

// const MONGODB_URL = 'mongodb+srv://Shivam_kushwaha:Shivam123@cluster0.rpkcw2e.mongodb.net/test';

exports.connect = () => {
    // console.log(typeof MONGODB_URL);
    mongoose.connect("mongodb+srv://Shivam_kushwaha:Shivam123@cluster0.rpkcw2e.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then(
        console.log(`DB connected Successfully`)
    )
    .catch((error) => {
        console.log(`DB connection FAILED`);
        console.log(error);
        process.exit(1)
    })
}