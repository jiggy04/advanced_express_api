const ArticleModel = require('../models/article.model');
const { getPagination } = require('../utils/pagination');

const postArticle = async (req, res, next) => {
    try {
        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });

        await newArticle.save();

        return res.status(201).json({
            message: 'Article created successfully',
            data: newArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllArticle = async (req, res, next) => {
    const { search } = req.query;
    const { limit, page, skip } = getPagination(req.query);

    let filter = {};

    if (search) {
        filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ]
        };
    }

    console.log('Search:', search);
    console.log('filter:', filter);

    try {
        const articles = await ArticleModel.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            message: 'Articles Fetched',
            page,
            limit,
            data: articles
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res.status(200).json({
            message: 'Article found',
            data: article
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not Found' });
        }

        return res.status(200).json({
            message: 'Article updated successfully',
            data: updatedArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not Found' });
        }

        return res.status(200).json({
            message: 'Article deleted successfully',
            data: deletedArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
};
