const mongoose = require('mongoose');

const connect = (dbname) => {
    return mongoose.connect(`mongodb://localhost:27017/${dbname}`);
};

module.exports = connect;
