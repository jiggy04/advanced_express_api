const express = require('express');
const router = express.Router();

const {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
} = require('../controllers/article.controller');

const requireAuth = require('../middlewares/requireAuth');
const isOwner = require('../middlewares/owner.auth');
const validate = require('../middlewares/validate');
const {
    postArticleSchema,
    updateArticleSchema
} = require('../validators/article.validator');

router.post('/articles', requireAuth, validate(postArticleSchema), postArticle);
router.get('/articles', requireAuth, getAllArticle);
router.get('/articles/:id', requireAuth, getArticleById);
router.put(
    '/articles/:id',
    requireAuth,
    isOwner,
    validate(updateArticleSchema),
    updateArticleById
);
router.delete('/articles/:id', requireAuth, isOwner, deleteArticleById);

module.exports = router;
