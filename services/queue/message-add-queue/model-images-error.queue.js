const Queue = require('bull');
const REDIS_CONFIG = require('../../../config/environment/environments');

const model_Images_error_queue = new Queue('model_images_error_queue', {
    redis:REDIS_CONFIG
})


module.exports = model_Images_error_queue;