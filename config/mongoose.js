const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;