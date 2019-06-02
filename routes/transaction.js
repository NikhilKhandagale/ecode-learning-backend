var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");
var universalFunctions = require("../utils/universalFunctions");
var config = require("../config");
var SUCCESS = config.APP_CONSTANTS.STATUS_MSG.SUCCESS;

router.post("/buyCourse", function(req, res, next) {
    var payloadData = req.body;
  Controllers.TransactionController.buyCourse(payloadData, function(err, data) {
    if (err)
      res
        .status(universalFunctions.sendError(err).output.statusCode)
        .send(universalFunctions.sendError(err).output.payload);
    else{
      res.send(universalFunctions.sendSuccess(SUCCESS.DEFAULT, data));
    } 
  });
});

module.exports = router;
