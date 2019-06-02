/**
 * Created by Navit on 1/20/16.
 */
"use strict";

var Models = require("../models");

var updateUser = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Users.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createUser = function(objToSave, callback) {
  new Models.Users(objToSave).save(callback);
};
//Delete User in DB
var deleteUser = function(criteria, callback) {
  Models.Users.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUser = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.Users.find(criteria, projection, options, callback);
};

module.exports = {
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser,
  getUser: getUser
};
