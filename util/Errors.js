// errorHandler.js

const errorHandler = {
  get: (tag) => {
    const errors = {
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
