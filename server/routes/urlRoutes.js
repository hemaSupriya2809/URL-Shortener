const express = require('express');
const router = express.Router();
const {
    shortenUrl,
    getUrls,
    deleteUrl,
} = require('../controllers/urlController');
const { getUrlAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/shorten', protect, shortenUrl);
router.get('/', protect, getUrls);
router.get('/:id/analytics', protect, getUrlAnalytics);
router.delete('/:id', protect, deleteUrl);

module.exports = router;
