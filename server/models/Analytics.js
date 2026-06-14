const mongoose = require('mongoose');

const analyticsSchema = mongoose.Schema(
    {
        url: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Url',
        },
        ipAddress: {
            type: String,
            default: 'Unknown',
        },
        userAgent: {
            type: String,
            default: 'Unknown',
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
