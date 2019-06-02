"use strict";
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var ERROR = config.APP_CONSTANTS.STATUS_MSG.ERROR;
var Service = require("../services");
var async = require("async");

var addCourse = function(payloadData, callback) {
  var courseData;
  async.series(
    [
      function(cb) {
        Service.CourseService.createCourse(payloadData, function(err, data) {
          if (err) cb(err);
          else {
            courseData = data;
            cb();
          }
        });
      }
    ],
    function(err, result) {
      if (err) callback(err);
      else callback(null, courseData);
    }
  );
};

var getFreeCourse = function(callback) {
  Service.CourseService.getCourse({ courseType: "FREE" }, {}, {}, function(
    err,
    data
  ) {
    if (err) callback(err);
    else callback(null, data);
  });
};

var getPaidCourse = function(callback) {
  Service.CourseService.getCourse({ courseType: "PAID" }, {}, {}, function(
    err,
    data
  ) {
    if (err) callback(err);
    else callback(null, data);
  });
};

module.exports = {
  addCourse: addCourse,
  getFreeCourse: getFreeCourse,
  getPaidCourse: getPaidCourse
};
