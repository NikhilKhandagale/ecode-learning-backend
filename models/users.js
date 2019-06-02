var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cardDetails = new Schema({
  cardNumber: { type: Number, trim: true, required: true },
  cardType: { type: String, trim: true, required: true },
  cardId: { type: String, trim: true, required: true },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
});

var user = new Schema({
  first_name: { type: String, trim: true, required: true },
  last_name: { type: String, trim: true, required: true },
  emailId: { type: String, trim: true, unique: true, required: true },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    min: 5,
    max: 15
  },
  password: { type: String },
  paymentCard: { type: [cardDetails] },
  registrationDate: { type: Date, default: Date.now },
  stripeId:{type: String}
});

module.exports = mongoose.model("user", user);
