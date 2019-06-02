var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Config = require("../config");

var transaction = new Schema({
  courseId: { type: Schema.ObjectId, ref: "course" },
  userId: { type: Schema.ObjectId, ref: "user" },
  amount: { type: Number },
  paymentStatus: {
    type: String,
    enum: [
      Config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.WAITING,
      Config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.REFUND,
      Config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.COMPLETED,
      Config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.DECLINED
    ],
    default: Config.APP_CONSTANTS.DATABASE.PAYMENT_STATUS.WAITING
  },
  transactionStatus: {
    type: String,
    enum: [
      Config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.PENDING,
      Config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.REFUND,
      Config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.CANCELED,
      Config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.SUCCESS
    ],
    default: Config.APP_CONSTANTS.DATABASE.TRANSACTION_STATUS.PENDING
  },
  paymentId: { type: String }
});

module.exports = mongoose.model("transaction", transaction);
