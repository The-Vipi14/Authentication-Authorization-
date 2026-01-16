const mongoose = require('mongoose')

const conn_db = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.log(error)
    }
}

module.exports = conn_db;