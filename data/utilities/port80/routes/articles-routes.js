const express = require("express");

const {
    articleGetSingle,
    articleGetHottest,
    articleGetAllId,
} = require("../controllers/articles-controller");

const articlerouter = express.Router();

articlerouter.get("/search", articleGetSingle);
articlerouter.get("/hottest", articleGetHottest);
articlerouter.get("/aid", articleGetAllId);

module.exports = articlerouter;
