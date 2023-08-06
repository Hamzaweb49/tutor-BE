const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect(
      'mongodb+srv://testuser1:testuser1@cluster0.g1k9l9w.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log(err));
};
