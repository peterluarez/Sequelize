module.exports = {
  validateRequiredFields: (requiredFields) => {
    const filterMissingFields = Object.entries(requiredFields)
      .filter(
        ([key, value]) => value === undefined || value === null || value === ""
      )
      .map(([key]) => key);
    return filterMissingFields;
  },
};
