const Url = require('../models/Url');
const Analytics = require('../models/Analytics');

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
const redirectUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const url = await Url.findOne({ shortCode });

        if (url) {
            // Increment click count on URL model
            url.clicks++;
            await url.save();

            // Log detailed analytics
            await Analytics.create({
                url: url._id,
                ipAddress: req.ip || req.headers['x-forwarded-for'] || 'Unknown',
                userAgent: req.headers['user-agent'] || 'Unknown',
            });

            return res.redirect(url.originalUrl);
        } else {
            res.status(404);
            throw new Error('URL not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { redirectUrl };
