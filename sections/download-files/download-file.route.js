const { downloadImageController } = require('./download-file.controller');

const router = require('express').Router();

router.post("/download-image", downloadImageController);


module.exports = router;