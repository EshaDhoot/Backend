const dotenv = require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}