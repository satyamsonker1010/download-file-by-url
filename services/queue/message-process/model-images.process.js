const crypto = require("crypto");
const {
  downloadImageUseCase,
  uploadImageInS3BucketUseCase,
} = require("../../../sections/download-files/donwload-file.usecase");
const model_Images_error_queue = require("../message-add-queue/model-images-error.queue");
const { default: axios } = require("axios");

const imagesProcess = async (job, done) => {
  const jobId = job?.id;
  const messageObject = job?.data;
  const { modelId, modelName, imagesUrls } = messageObject;
  const { xs, sm, md, lg, xl } = imagesUrls?.card_main_rect?.["0"];
  try {
    const response1 = await finalUploadImageObject({
      imageInfo: xs,
      modelId,
      modelName,
      imageSize: "xs",
    });
    const xsResponse =  await finalCall(response1);
    const response2 = await finalUploadImageObject({
      imageInfo: sm,
      modelId,
      modelName,
      imageSize: "sm",
    });
    const smResponse = await finalCall(response2);
    const response3 = await finalUploadImageObject({
      imageInfo: md,
      modelId,
      modelName,
      imageSize: "md",
    });
    const mdResponse = await finalCall(response3);
    const response4 = await finalUploadImageObject({
      imageInfo: lg,
      modelId,
      modelName,
      imageSize: "lg",
    });
    const lgResponse = await finalCall(response4);
    const response5 = await finalUploadImageObject({
      imageInfo: xl,
      modelId,
      modelName,
      imageSize: "xl",
    });
    const xlResponse = await finalCall(response5);
    const saveModelImageObject = {model_id:modelId,image_xs:xsResponse?.fileName,image_sm:smResponse?.fileName,image_md:mdResponse?.fileName,image_lg:lgResponse?.fileName,image_xl:xlResponse?.fileName}; 
    await modelImageEntryCreateInDB(saveModelImageObject);
    done();
  } catch (error) {
    await model_Images_error_queue.add(messageObject);
    console.log(error);
  }
};

function uploadImageNameGenerator(imageData) {
  const { width, height, url } = imageData;

  let imageName = "";
  // Starting image name
  const random_fifteen_character = crypto.randomBytes(15).toString("hex");
  // combine height and width
  const width_height = `w-${width}_h-${height}`;
  // final name
  imageName = `${random_fifteen_character}__${width_height}`;
  return { imageName, url };
}

function finalUploadImageObject({ imageInfo, modelId, modelName, imageSize }) {
  // Updated Image Object
  const imageData = uploadImageNameGenerator(imageInfo);
  // Final Upload Image Path
  const folderName = modelName?.toLowerCase()?.split(" ")?.join("_");
  const childFolder = imageSize;
  const folderPath = `${folderName}/${childFolder}`;
  //final upload image Object
  const imageObjectData = { ...imageData, folderPath, modelId };
  return imageObjectData;
}

async function finalCall(responseData){
  const downloadImageCase = await downloadImageUseCase({
    ...responseData,
    receiveFileName: responseData?.imageName,
  });
  const uploadInS3Case = await uploadImageInS3BucketUseCase({...downloadImageCase , fileName:`${responseData?.folderPath}/${downloadImageCase?.fileName}`});
  console.log(uploadInS3Case);
  console.log("\n");
  return uploadInS3Case;
}

async function modelImageEntryCreateInDB(entryObject){
   const {data} = await axios.post("http://localhost:7500/api/v1/model-images/create",entryObject);
   console.log(data?.message);
   console.log("\n");
   console.log("\n");
   console.log("\n");
  console.log("----------------------------");
}

module.exports = imagesProcess;
