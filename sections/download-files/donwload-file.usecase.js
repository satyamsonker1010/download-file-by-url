const fs = require("fs");
const path = require("path");
const { uploadFileInS3Bucket } = require("./download-file.uecase.handler");
const downloadImageUsecase = async ({ url }) => {
  try {
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer()); // Get response body as a Buffer
    const fileName = "image.jpg"; // Name of the file to save
    const folderPath = path.join(__dirname, "../../assets/images");
    const filePath = path.join(folderPath, fileName);
    await fs.writeFileSync(filePath, buffer); // Write buffer data to a file
    const fileUploadInS3BucketDetails = await uploadFileInS3Bucket(
      `${filePath}`,
      fileName
    );
    console.log(`Image downloaded and saved as ${fileName}`);
    return { details: fileUploadInS3BucketDetails, fileName }; // Return the filename
  } catch (error) {
    console.log(error);
    throw Error("Error downloading image");
  }
};

module.exports = { downloadImageUsecase };
