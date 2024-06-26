const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { uploadFileInS3Bucket } = require("./download-file.uecase.handler");
const downloadImageUseCase = async ({ url , receiveFileName }) => {
  try {
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer()); // Get response body as a Buffer
    const fileName =  receiveFileName ?  `${receiveFileName}.jpg` : `${crypto.randomBytes(15).toString("hex")}.jpg`; // Name of the file to save
    const folderPath = path.join(__dirname, "../../assets/images");
    const filePath = path.join(folderPath, fileName);
    await fs.writeFileSync(filePath, buffer); // Write buffer data to a file
    // Return the filename and filepath
    return {filePath ,fileName };
  } catch (error) {
    console.log(error);
    throw Error("Error downloading image");
  }
};


const uploadImageInS3BucketUseCase = async({filePath , fileName})=>{
  const fileUploadInS3BucketDetails = await uploadFileInS3Bucket(
    `${filePath}`,
    fileName //what is the name of file when store in s3 bucket
  );
  return { details: fileUploadInS3BucketDetails, fileName }; 
}


module.exports = { downloadImageUseCase ,uploadImageInS3BucketUseCase};
