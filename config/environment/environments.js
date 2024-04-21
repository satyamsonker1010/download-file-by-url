const dotenv = require('dotenv');

dotenv.config();

// Aws Vareables
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;


// Project vareables
const PORT = process.env.PORT || 8900;


module.exports = {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
    PORT
}