"use strict";
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var ERROR = config.APP_CONSTANTS.STATUS_MSG.ERROR;
var Service = require("../services");
var async = require("async");
var _ = require("underscore")

var registerUser = function(payloadData, callback) {
  var userData;
  var cardData;
  payloadData.password = universalFunctions.CryptData(payloadData.password);
  async.series(
    [
      function(cb) {
        //Validate phone No
        if (
          payloadData.phoneNumber &&
          payloadData.phoneNumber.split("")[0] == 0
        ) {
          cb(ERROR.INVALID_PHONE_NO_FORMAT);
        } else {
          cb();
        }
      },
      function(cb) {
        Service.UserService.createUser(payloadData, function(err, data) {
          if (err) {
            if (
              err.code == 11000 &&
              err.message.indexOf("phoneNumber_1") > -1
            ) {
              cb(ERROR.PHONE_NO_EXIST);
            } else if (
              err.code == 11000 &&
              err.message.indexOf("emailId_1") > -1
            ) {
              cb(ERROR.EMAIL_NO_EXIST);
            } else {
              cb(err);
            }
          } else {
            userData = data;
            cb();
          }
        });
      },
      function(cb) {
        Service.PaymentService.createStripeCustomer(payloadData, function(
          err,
          data
        ) {
          console.log(">>>>", err, data);
          if (err) cb(err);
          else {
            userData.stripeId = data.id;
            cb();
          }
        });
      },
      function(cb) {
        var criteria = {
          _id: userData._id
        };
        var dataToUpdate = {
          $set: {
            stripeId: userData.stripeId
          }
        };
        Service.UserService.updateUser(criteria, dataToUpdate, {}, function(
          err,
          data
        ) {
          if (err) cb(err);
          else cb();
        });
      },
      function(cb) {
        var payloadStripe = {
          customerId: userData.stripeId
        };
        Service.PaymentService.addStripeCard(payloadStripe, function(
          err,
          data
        ) {
          console.log(err, data);
          if (err) cb(err);
          else {
            cardData = {
              cardNumber: data.last4,
              cardType: data.brand,
              cardId: data.id
            };
            cb();
          }
        });
      },
      function(cb) {
        var criteria = {
          _id: userData._id
        };
        var dataToUpdate = {
          $push: {
            paymentCard: cardData
          }
        };
        Service.UserService.updateUser(criteria, dataToUpdate, {}, function(
          err,
          data
        ) {
          if (err) cb(err);
          else cb();
        });
      },
      function(cb){
        var criteria = {
            _id: userData._id
          };
          Service.UserService.getUser(criteria,{},{},function(err,data){
              if(err) cb(err)
              else {
                  userData = (data && data[0]) || null
                  cb()
              }
          })
      }
    ],
    function(err, result) {
      if (err) callback(err);
      else
        callback(null, universalFunctions.deleteUnnecessaryUserData(userData));
    }
  );
};

var loginUser = function(payloadData, callback) {
  var userFound = false;
  async.series(
    [
      function(cb) {
        var criteria = {
          emailId: payloadData.emailId
        };
        var option = {
          lean: true
        };
        Service.UserService.getUser(criteria, {}, option, function(
          err,
          result
        ) {
          if (err) {
            cb(err);
          } else {
            userFound = (result && result[0]) || null;
            if (!userFound) {
              cb(ERROR.USER_NOT_REGISTERED);
            } else {
              if (
                userFound &&
                userFound.password !=
                  universalFunctions.CryptData(payloadData.password)
              ) {
                cb(ERROR.INCORRECT_PASSWORD);
              } else {
                cb();
              }
            }
          }
        });
      }
    ],
    function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, universalFunctions.deleteUnnecessaryUserData(userFound));
      }
    }
  );
};

var getProfile = function(payloadData, callback) {
  var userData;
  Service.UserService.getUser(
    { emailId: payloadData.emailId },
    {},
    {},
    function(err, data) {
      if (err) callback(err);
      else {
        if (data.length == 0) callback(ERROR.USER_NOT_REGISTERED);
        else {
          userData = (data && data[0]) || null;
          callback(
            null,
            universalFunctions.deleteUnnecessaryUserData(userData)
          );
        }
      }
    }
  );
};

var changePassword = function(payloadData, callback) {
  var oldPassword = universalFunctions.CryptData(payloadData.oldPassword);
  var newPassword = universalFunctions.CryptData(payloadData.newPassword);
  async.series(
    [
      function(callback) {
        var query = {
          emailId: payloadData.emailId
        };
        var projection = {
          password: 1
        };
        var options = { lean: true };
        Service.UserService.getUser(query, projection, options, function(
          err,
          data
        ) {
          if (err) {
            callback(err);
          } else {
            var customerData = (data && data[0]) || null;
            if (customerData == null) {
              callback(ERROR.NOT_FOUND);
            } else {
              if (
                data[0].password == oldPassword &&
                data[0].password != newPassword
              ) {
                callback(null);
              } else if (data[0].password != oldPassword) {
                callback(ERROR.WRONG_PASSWORD);
              } else if (data[0].password == newPassword) {
                callback(ERROR.NOT_UPDATE);
              }
            }
          }
        });
      },
      function(callback) {
        var dataToUpdate = { $set: { password: newPassword } };
        var condition = { emailId: payloadData.emailId };
        Service.UserService.updateUser(condition, dataToUpdate, {}, function(
          err,
          user
        ) {
          if (err) {
            callback(err);
          } else {
            if (!user || user.length == 0) {
              callback(ERROR.NOT_FOUND);
            } else {
              callback(null);
            }
          }
        });
      }
    ],
    function(error, result) {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    }
  );
};

var addCard = function(payloadData, callback) {
  var customerData;
  var cardData;
  async.series(
    [
      function(callback) {
        var query = {
          emailId: payloadData.emailId
        };
        var options = { lean: true };
        Service.UserService.getUser(query, {}, options, function(err, data) {
          if (err) {
            callback(err);
          } else {
            customerData = (data && data[0]) || null;
            if (customerData == null) {
              callback(ERROR.NOT_FOUND);
            } else callback();
          }
        });
      },
      function(cb) {
        var payloadStripe = {
          customerId: customerData.stripeId
        };
        Service.PaymentService.addStripeCard(payloadStripe, function(
          err,
          data
        ) {
          console.log(err, data);
          if (err) cb(err);
          else {
            cardData = {
              cardNumber: data.last4,
              cardType: data.brand,
              cardId: data.id
            };
            cb();
          }
        });
      },
      function(cb) {
        var criteria = {
          _id: customerData._id
        };
        var dataToUpdate = {
          $push: {
            paymentCard: cardData
          }
        };
        Service.UserService.updateUser(criteria, dataToUpdate, {}, function(
          err,
          data
        ) {
          if (err) cb(err);
          else cb();
        });
      }
    ],
    function(error, result) {
      if (error) {
        callback(error);
      } else {
        callback(null, cardData);
      }
    }
  );
};

var getBoughtCourses = function(payloadData, callback) {
  var customerData;
  var courses = [];
  var finalCourseData=[];
  async.series(
    [
      function(callback) {
        var query = {
          emailId: payloadData.emailId
        };
        var options = { lean: true };
        Service.UserService.getUser(query, {}, options, function(err, data) {
          if (err) {
            callback(err);
          } else {
            customerData = (data && data[0]) || null;
            if (customerData == null) {
              callback(ERROR.NOT_FOUND);
            } else callback();
          }
        });
      },
      function(cb){
          var criteria = {
              userId: customerData._id
          }
          Service.TransactionService.getTransaction(criteria,{},{},function(err,data){
              if(err) cb(err)
              else {
                data.forEach(function(element){
                    courses.push(element.courseId)
                })
                cb()
              }
          })
      },
      function(cb){
        if(courses){
            var taskInParallel = [];
					for (var key in courses) {
						(function (key) {
							taskInParallel.push(
								(function (key) {
									return function (embeddedCB) {
										var criteria = {
											_id: courses[key],
										};
										Service.CourseService.getCourse(criteria, {}, {}, function (err, data) {
											if (err) embeddedCB(err);
											else {
												finalCourseData.push(data[0])
												embeddedCB();
											}
										});
									};
								})(key)
							);
						})(key);
					}
					async.parallel(taskInParallel, function (err, result) {
						cb(null);
					});
        }
        else{
            cb()
        }
      }
    ],
    function(err, result) {
      if (err) callback(err);
      else callback(null,finalCourseData);
    }
  );
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getProfile: getProfile,
  changePassword: changePassword,
  addCard: addCard,
  getBoughtCourses: getBoughtCourses
};
