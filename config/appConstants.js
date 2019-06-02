var SERVER = {
  APP_NAME: "Ecode-Learning",
  PORTS: {
    PORT: 8000
  },
  COUNTRY_CODE: "+61",
  DOMAIN_NAME: "http://localhost:3000/",
  accountSid: "AC8f2cf2a29bec534b97e29dbe5090c0eb", // Your Account SID from www.twilio.com/console
  authToken: "0dd0d8e798b0d66ed6b3e2fda3c0c259",
  twilioPhone: "+61488851867"
};
var PAYMENT_GATEWAY = {
  SECRET_KEY: "sk_test_pX942sLVcA2UDx6v6pfB6YCL00J7MYET9I"
};

var swaggerDefaultResponseMessages = [
  { code: 200, message: "OK" },
  { code: 400, message: "Bad Request" },
  { code: 401, message: "Unauthorized" },
  { code: 404, message: "Data Not Found" },
  { code: 500, message: "Internal Server Error" }
];
var DATABASE = {
  PAYMENT_STATUS: {
    WAITING: "WAITING",
    COMPLETED: "COMPLETED",
    DECLINED: "DECLINED",
    HOLD: "HOLD",
    REFUND: "REFUND"
  },
  TRANSACTION_STATUS: {
    PENDING: "PENDING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    CANCELED: "CANCELED",
    REFUND: "REFUND"
  },
  COURSE_TYPE: {
    FREE: "FREE",
    PAID: "PAID"
  }
};
var STATUS_MSG = {
  ERROR: {
    DEFAULT: {
      statusCode: 400,
      customMessage: "Error",
      type: "DEFAULT"
    },
    USER_ALREADY_REGISTERED: {
      statusCode: 409,
      customMessage: "You are already registered with us",
      type: "USER_ALREADY_REGISTERED"
    },
    PASSWORD_REQUIRED: {
      statusCode: 400,
      customMessage: "Password is required",
      type: "PASSWORD_REQUIRED"
    },
    INVALID_PHONE_NO_FORMAT: {
      statusCode: 400,
      customMessage: "Phone no. cannot start with 0",
      type: "INVALID_PHONE_NO_FORMAT"
    },
    IMP_ERROR: {
      statusCode: 500,
      customMessage: "Implementation Error",
      type: "IMP_ERROR"
    },
    PHONE_NO_EXIST: {
      statusCode: 400,
      customMessage: "Mobile No. Already Exist",
      type: "PHONE_NO_EXIST"
    },
    EMAIL_NO_EXIST: {
      statusCode: 400,
      customMessage: "Email ID Already Exist",
      type: "EMAIL_NO_EXIST"
    },
    INCORRECT_PASSWORD: {
      statusCode: 400,
      customMessage: "Incorrect Password",
      type: "INCORRECT_PASSWORD"
    },
    NOT_FOUND: {
      statusCode: 400,
      customMessage: "User Not Found",
      type: "NOT_FOUND"
    },
    USER_NOT_REGISTERED: {
      statusCode: 401,
      customMessage: "User is not registered with us",
      type: "USER_NOT_REGISTERED"
    },
    INCORRECT_ID: {
      statusCode: 401,
      customMessage: "Incorrect Phone Number",
      type: "INCORRECT_ID"
    },
    INVALID_EMAIL_FORMAT: {
      statusCode: 400,
      customMessage: "Inavlid email format",
      type: "INVALID_EMAIL_FORMAT"
    },
    WRONG_PASSWORD: {
      statusCode: 400,
      customMessage: "Invalid old password",
      type: "WRONG_PASSWORD"
    },
    NOT_UPDATE: {
      statusCode: 409,
      customMessage: "New password must be different from old password",
      type: "NOT_UPDATE"
    },
    COURSE_DOESNOT_EXIST: {
      statusCode: 400,
      customMessage: "Course does not exist",
      type: "COURSE_DOESNOT_EXIST"
    },
    PAYMENT_CARD_NOT_ADDED: {
      statusCode: 400,
      customMessage: "Payment Card not added",
      type: "PAYMENT_CARD_NOT_ADDED"
    },
    PAYMENT_NOT_PROCCESSED: {
      statusCode: 400,
      customMessage: "Payment could not be processed",
      type: "PAYMENT_NOT_PROCCESSED"
    },
    COURSE_ALREADY_BOUGHT: {
      statusCode: 400,
      customMessage: "Course has already been bought buy you!",
      type: "COURSE_ALREADY_BOUGHT"
    }
  },
  SUCCESS: {
    DEFAULT: {
      statusCode: 200,
      customMessage: "Success",
      type: "DEFAULT"
    },
    CREATED: {
      statusCode: 201,
      customMessage: "Created Successfully",
      type: "CREATED"
    },
    LOGOUT: {
      statusCode: 200,
      customMessage: "Logged Out Successfully",
      type: "LOGOUT"
    },
    PASSWORD_RESET: {
      statusCode: 200,
      customMessage: "Password Reset Successfully",
      type: "PASSWORD_RESET"
    }
  }
};

var TIME_UNITS = {
  MONTHS: "months",
  HOURS: "hours",
  MINUTES: "minutes",
  SECONDS: "seconds",
  WEEKS: "weeks",
  DAYS: "days"
};

var APP_CONSTANTS = {
  SERVER: SERVER,
  TIME_UNITS: TIME_UNITS,
  DATABASE: DATABASE,
  swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
  STATUS_MSG: STATUS_MSG,
  PAYMENT_GATEWAY: PAYMENT_GATEWAY
};

module.exports = APP_CONSTANTS;
