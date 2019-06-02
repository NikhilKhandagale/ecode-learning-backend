var Models = require("../Models");
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var stripe = require("stripe")(config.APP_CONSTANTS.PAYMENT_GATEWAY.SECRET_KEY);

var createStripeCustomer = function(payloadData, callback) {
  stripe.customers.create(
    {
      name: payloadData.first_name + " " + payloadData.last_name,
      email: payloadData.emailId
    },
    callback
  );
};

var addStripeCard = function(payloadData, callback) {
  stripe.customers.createSource(
    payloadData.customerId,
    {
      source: "tok_visa"
    },
    callback
  );
};

var createCharge = function(payloadData, callback) {
    stripe.charges.create({
        amount: payloadData.amount*100,
        currency: "aud",
        capture: true,
        customer: payloadData.customerId,
        source: "tok_visa"
    },callback)
};

module.exports = {
  createStripeCustomer: createStripeCustomer,
  addStripeCard: addStripeCard,
  createCharge: createCharge
};
