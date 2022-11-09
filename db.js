const mongoose = require("mongoose");
require("dotenv/config");

const connectToDatabase = function () {
    try {
        mongoose.connect(
            "mongodb://localhost:27017/serverlessdb",
            () => {
                console.log("Connection Successfull");
            }
        );
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectToDatabase;