const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// @desc    Shorten a URL
// @route   POST /api/urls/shorten
// @access  Private
const shortenUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            res.status(400);
            throw new Error('Please provide an original URL');
        }

        // Generate unique short code
        const shortCode = nanoid(7);

        const url = await Url.create({
            originalUrl,
            shortCode,
            user: req.user.id,
        });

        res.status(201).json(url);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all user URLs
// @route   GET /api/urls
// @access  Private
const getUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a URL
// @route   DELETE /api/urls/:id
// @access  Private
const deleteUrl = async (req, res, next) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            res.status(404);
            throw new Error('URL not found');
        }

        // Check for user
        if (url.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await url.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'URL removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    shortenUrl,
    getUrls,
    deleteUrl,
};
