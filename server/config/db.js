const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('DB.JS LOADED');
    console.log('MONGO_URI =', process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error:');
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;