const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL
const connect = async () => {
    await mongoose.connect(
        DB_URL
    );
};

module.exports = { connect };