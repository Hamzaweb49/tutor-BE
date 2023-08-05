const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://hamzaazam29:hamzaazam29tutorapp@cluster0.cjfa6oz.mongodb.net/"
    )
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));
};
