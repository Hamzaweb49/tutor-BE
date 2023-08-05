const express = require("express");
const user = require("../routes/user");
const notfound = require("../middlewares/notfound");
const error = require("../middlewares/error");
const cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use("/user", user);
  app.use(notfound);
  app.use(error);
};
