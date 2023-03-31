const Article = require("../models/article-schema");

const articleGetAllId = async (req, res) => {
    const results = await Article.find().select("id");

    return res.status(200).json(results);
};
const articleGetSingle = async (req, res) => {
    const id = req.query.id;
    const temp = await Article.findById(id);
    if (!id) {
        return res.status(400).json({ message: "title required" });
    }
    let article;
    try {
        article = await Article.aggregate([
            {
                $match: {
                    title: temp.title,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $project: {
                    author: {
                        password: 0,
                    },
                },
            },
            {
                $unwind: "$author",
            },
        ]);

        if (!article || article.length == 0) {
            const error = new Error("Article not found", 400);
            return next(error);
        }
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }

    return res.status(200).json(article[0]);
};

const articleGetHottest = async (req, res) => {
    let articles = [];
    let count = req.query.count || 5;

    try {
        articles = await Article.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $project: {
                    author: {
                        password: 0,
                    },
                },
            },
            {
                $unwind: "$author",
            },
        ])
            .sort({ createdAt: -1 })
            .limit(5);
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
    return res.status(200).json(articles);
};

module.exports = {
    articleGetSingle,
    articleGetHottest,
    articleGetAllId,
};
