"use strict";
const environment = process.env.NODE_ENV;
const Label = require("../../../db/models/label");
const Errors = require("../../../util/Errors");
const Utility = require("../../../util/utility");
const { Op } = require("sequelize");

module.exports = {
  getAllLabel: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const search = req.query.search || "";
    
    try {
      const queryOptions = {
        include: [],
        where: {},
      }; 
      const offset = (page - 1) * size;
      queryOptions.limit = size;
      queryOptions.offset = offset;
      if (search) {
        queryOptions.where.text = { [Op.iLike]: `%${search}%` };
      }

      const fetchData = await Label.findAndCountAll(queryOptions);

      if (fetchData.rows <= 0) {
        const errors = Errors.raise("NO_DATA_FOUND");
        return res.status(errors.status).json(errors);
      }
      const totalPage = Math.ceil(fetchData.count / size);
      res.status(200).json({
        status: "Success",
        data: fetchData.rows,
        page: page,
        size: size,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
