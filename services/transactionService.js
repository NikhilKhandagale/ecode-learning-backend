/**
 * Created by Navit on 1/20/16.
 */
"use strict";

var Models = require("../models");

var updateTransaction = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Transaction.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createTransaction = function(objToSave, callback) {
  new Models.Transaction(objToSave).save(callback);
};
//Delete User in DB
var deleteTransaction = function(criteria, callback) {
  Models.Transaction.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getTransaction = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.Transaction.find(criteria, projection, options, callback);
};

module.exports = {
  updateTransaction: updateTransaction,
  createTransaction: createTransaction,
  deleteTransaction: deleteTransaction,
  getTransaction: getTransaction
};
