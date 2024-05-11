const Queue = require('bull');
const path = require('path');
const { REDIS_CONFIG } = require('../../config/environment/environments');

// Access the message queue
const modelImagesQueue = new Queue('models_images',{redis:REDIS_CONFIG});
modelImagesQueue.process(path.join(`${__dirname}/message-process`,'model-images.process.js'));