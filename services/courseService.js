/**
 * Created by Navit on 1/20/16.
 */
"use strict";

var Models = require("../models");

var updateCourse = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Course.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createCourse = function(objToSave, callback) {
  new Models.Course(objToSave).save(callback);
};
//Delete User in DB
var deleteCourse = function(criteria, callback) {
  Models.Course.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getCourse = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.Course.find(criteria, projection, options, callback);
};

module.exports = {
  updateCourse: updateCourse,
  createCourse: createCourse,
  deleteCourse: deleteCourse,
  getCourse: getCourse
};
