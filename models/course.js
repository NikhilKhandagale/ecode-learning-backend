var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Config = require("../config");

var course = new Schema({
  courseName: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  videoUrl: { type: String, trim: true, required: true },
  courseType: {
    type: String,
    enum: [
      Config.APP_CONSTANTS.DATABASE.COURSE_TYPE.FREE,
      Config.APP_CONSTANTS.DATABASE.COURSE_TYPE.PAID
    ]
  },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model("course", course);
