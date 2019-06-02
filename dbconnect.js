var Mongoose = require('mongoose');

var MONGO_URI = "mongodb+srv://ecode-admin:navc011337@ecode-learning-qqbge.mongodb.net/test?retryWrites=true&w=majority"

//Connect to MongoDB
Mongoose.connect(MONGO_URI,{useNewUrlParser: true}, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});

exports.Mongoose = Mongoose;