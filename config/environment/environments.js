const dotenv = require('dotenv');

dotenv.config();

// Aws Vareables
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;


// Project variable
const PORT = process.env.PORT || 8900;

// Redis Configuration
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const REDIS_CONFIG = {
    host: REDIS_HOST,
    port: REDIS_PORT
}

module.exports = {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
    PORT,
    REDIS_CONFIG
}