const mongoose = require('mongoose');

const connect = (dbname) => {
    const mongoUri = process.env.MONGO_URI || `mongodb://localhost:27017/${dbname}`;
    
    // Demo mode - skip connection if no MONGO_URI
    if (!process.env.MONGO_URI && process.env.VERCEL) {
        console.log('Running in demo mode - no database connection');
        return Promise.resolve();
    }
    
    return mongoose.connect(mongoUri);
};

module.exports = connect;
