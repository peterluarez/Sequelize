"use strict";

module.exports = {
  checkStatus: (req, res) => {
    try {
      res.status(200).json({ message: "Success", details: "Status is online" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
