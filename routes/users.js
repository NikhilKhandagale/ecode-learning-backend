var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var SUCCESS = config.APP_CONSTANTS.STATUS_MSG.SUCCESS;

router.post("/register", function(req, res, next) {
  console.log(req.body)
  var payloadData = req.body;
  Controllers.UserController.registerUser(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    }
  });
});

router.post("/login", function(req, res, next) {
  var payloadData = req.body;
  Controllers.UserController.loginUser(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    }
  });
});

router.get("/getProfile", function(req, res, next) {
  var payloadData = req.query;
  Controllers.UserController.getProfile(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    }
  });
});

router.put("/changePassword", function(req, res, next) {
  var payloadData = req.body;
  Controllers.UserController.changePassword(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.PASSWORD_RESET, data));
    }
  });
});

router.put("/addCard", function(req, res, next) {
  var payloadData = req.body;
  Controllers.UserController.addCard(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    }
  });
});

router.get("/getBoughtCourses", function(req, res, next) {
  var payloadData = req.query;
  Controllers.UserController.getBoughtCourses(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else {
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    }
  });
});

module.exports = router;
