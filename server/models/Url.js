const mongoose = require('mongoose');

const urlSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        originalUrl: {
            type: String,
            required: [true, 'Please add the original URL'],
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Url', urlSchema);
