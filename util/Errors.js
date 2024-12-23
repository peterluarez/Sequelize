// errorHandler.js

const errorHandler = {
  get: (tag) => {
    const errors = {
      INVALID_ID_OR_PASSWORD: {
        status: 400,
        error: {
          code: "F",
          message: "Invalid voters id or password.",
        },
      },
      MISSING_FIELDS: {
        status: 400,
        error: {
          code: "F",
          message: "Missing password field.",
        },
      },
      MISSING_PASSWORD: {
        status: 400,
        error: {
          code: "F",
          message: "Missing password field.",
        },
      },
      MISSING_VOTERS_ID_NUMBER: {
        status: 400,
        error: {
          code: "F",
          message: "Missing voters id number field.",
        },
      },
      MISSING_TOKEN_FIELD: {
        status: 401,
        error: {
          code: "F",
          message: "Missing Authorization field.",
        },
      },
      INVALID_TOKEN: {
        status: 401,
        error: {
          code: "F",
          message: "Invalid token.",
        },
      },
      UNAUTHORIZED_ACCESS: {
        status: 401,
        error: {
          code: "F",
          message: "Unauthorized Access.",
        },
      },
      UNAUTHORIZED_CLIENT_ID_SECRET: {
        status: 401,
        error: {
          code: "F",
          message: "Unauthorized Client Id and Secret.",
        },
      },
      NO_DATA_FOUND: {
        status: 400,
        error: {
          code: "F",
          message: "No data found.",
        },
      },
      NOT_FOUND: {
        status: 400,
        error: {
          code: "F",
          message: "No user found.",
        },
      },
      EXISTING_USER: {
        status: 400,
        error: {
          code: "F",
          message: "Voters Id is already registered.",
        },
      },
      REQUIRED_FIELDS: {
        status: 400,
        error: {
          code: "F",
          message: "Fields required.",
          fields: [],
        },
      }, 
    };
    return errors[tag] || null; 
  },

  raise: (e, details) => {
    const error = { ...errorHandler.get(e) }; 
    if (error) {
      error.error.details = details; 
    }
    return error; 
  },
};

module.exports = errorHandler;
