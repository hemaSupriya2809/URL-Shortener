const Analytics = require('../models/Analytics');
const Url = require('../models/Url');

// @desc    Get analytics for a specific URL
// @route   GET /api/urls/:id/analytics
// @access  Private
const getUrlAnalytics = async (req, res, next) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            res.status(404);
            throw new Error('URL not found');
        }

        // Check for ownership
        if (url.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const analytics = await Analytics.find({ url: req.params.id }).sort({ timestamp: -1 });
        
        res.status(200).json({
            url,
            analytics,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUrlAnalytics };
