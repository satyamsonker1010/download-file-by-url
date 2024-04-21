const fs = require("fs");
const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
} = require("../../config/environment/environments");

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_BUCKET_REGION,
});
const uploadFileInS3Bucket = async (ourFilePath, fileName) => {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(ourFilePath, (err, data) => {
        if (err) {
          reject({
            status: false,
            message: "file not found in the folder",
          });
        }
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `modal/${fileName}`,
          Body: data,
        };
        s3.upload(params, function (s3Err, data) {
          if (s3Err) throw s3Err;
          //   Delete the file after upload
          fs.unlinkSync(ourFilePath);
          resolve({
            status: true,
            location: data.Location,
          });
        });
      });
    });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { uploadFileInS3Bucket };
