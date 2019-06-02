var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var SUCCESS = config.APP_CONSTANTS.STATUS_MSG.SUCCESS;

router.post("/addCourse", function(req, res, next) {
    var payloadData = req.body;
  Controllers.CourseController.addCourse(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else{
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    } 
  });
});

router.get("/getFreeCourse", function(req, res, next) {
  Controllers.CourseController.getFreeCourse(function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else{
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    } 
  });
});

router.get("/getPaidCourse", function(req, res, next) {
    Controllers.CourseController.getPaidCourse(function(err, data) {
      if (err)
        res
          .status(universalFunctions.sendError(err).output.statusCode)
          .send(universalFunctions.sendError(err).output.payload);
      else{
        res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
      } 
    });
  });

module.exports = router;
