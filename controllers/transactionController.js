"use strict";
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var ERROR = config.APP_CONSTANTS.STATUS_MSG.ERROR;
var Service = require("../services");
var async = require("async");

var accountSid = config.APP_CONSTANTS.SERVER.accountSid; // Your Account SID from www.twilio.com/console
var authToken = config.APP_CONSTANTS.SERVER.authToken; // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var buyCourse = function(payloadData, callback) {
  var userData;
  var courseData;
  var transactionData;
  var paymentData;
  async.series(
    [
      function(cb) {
        var criteria = {
          emailId: payloadData.emailId
        };
        Service.UserService.getUser(criteria, {}, {}, function(err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.USER_NOT_REGISTERED);
            else {
              userData = (data && data[0]) || null;
              if(userData.paymentCard.length == 0) cb(ERROR.PAYMENT_CARD_NOT_ADDED)
              else cb()
            }
          }
        });
      },
      function(cb) {
        var criteria = {
          _id: payloadData.courseId
        };
        Service.CourseService.getCourse(criteria, {}, {}, function(err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.COURSE_DOESNOT_EXIST);
            else {
              courseData = (data && data[0]) || null;
              cb();
            }
          }
        });
      },
      function(cb){
        var criteria = {
            userId: userData._id,
            courseId: courseData._id
        }
        Service.TransactionService.getTransaction(criteria,{},{},function(err,data){
            if(err) cb(err)
            else {
                if(data.length !=0) cb(ERROR.COURSE_ALREADY_BOUGHT)
                else cb()
            }
        })
      },
      function(cb) {
          var paymentModel = {
            amount:courseData.price,
            customer: userData.stripeId,
            source: userData.paymentCard[0].cardId
          }
          Service.PaymentService.createCharge(paymentModel,function(err,data){
              if(err) cb(ERROR.PAYMENT_NOT_PROCCESSED)
              else {
                  paymentData = data;
                  cb()
              }
          })
      },
      function(cb) {
        var transactionModel = {
          courseId: courseData._id,
          userId: userData._id,
          amount: courseData.price,
          paymentId: paymentData.id,
          paymentStatus: config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.COMPLETED,
          transactionStatus: config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.SUCCESS
        };
        Service.TransactionService.createTransaction(transactionModel, function(
          err,
          data
        ) {
          if (err) cb(err);
          else {
            transactionData = data;
            cb();
          }
        });
      },
      function(cb){
        client.messages
		.create({
			body: "Thank you for buying our course, the course has been added to your account.",

			to: "+61"+userData.phoneNumber, // Text this number
			from: config.APP_CONSTANTS.SERVER.twilioPhone, // From a valid Twilio number
		},function(err,data){
            cb()
        })
      }
    ],
    function(err, result) {
      if (err) callback(err);
      else callback(null,transactionData);
    }
  );
};

module.exports = {
  buyCourse: buyCourse
};
