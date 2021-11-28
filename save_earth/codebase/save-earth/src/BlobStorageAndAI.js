import { BlobServiceClient} from '@azure/storage-blob';
// import { sasToken, storageAccountName } from './config'
const { PredictionAPIClient } = require("@azure/cognitiveservices-customvision-prediction");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

//  BlobStorage variables
const sasToken = process.env.REACT_APP_STORAGE_SAS_TOKEN || ""; // Fill string with your SAS token
// const containerName = `all`;
const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME || ""; // Fill string with your Storage resource name

// <predictYourImage starts>
// Create variables for your resource; replace variables with valid values.
const customVisionPredictionKey = process.env.REACT_APP_CUSTOM_VISION_PREDICTION_KEY;
const customVisionPredictionEndPoint = process.env.REACT_APP_CUSTOM_VISION_ENDPOINT;

// You can find the project ID in the settings of the Custom Vision project in the portal.
const projectId = process.env.REACT_APP_CUSTOM_VISION_PROJECT_ID;

// Now, you have a trained endpoint that you can use to make a prediction.
const credentials = new ApiKeyCredentials({ inHeader: {"Prediction-key": customVisionPredictionKey } });
const client = new PredictionAPIClient(credentials, customVisionPredictionEndPoint);

export const predictYourImage = async (myImageLink) => {

  const imageURL = myImageLink;

  var resultPrediction
  await client
    .classifyImageUrl(projectId, "Iteration1", { url: imageURL })
    .then(result => {
      resultPrediction = result.predictions[0]

      console.log("The result is: ", result);
    })
    .catch(err => {
      console.error(err);
    });

  return await resultPrediction
}

export const predictYourImageTwo = async (imageData) => {

  var resultPredictionTwo
  await client
    .classifyImage(projectId, "Iteration1", imageData)
    .then(result => {
      resultPredictionTwo = result.predictions[0]

      console.log("The result2 is: ");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });

  return await resultPredictionTwo
}

// <predictYourImage ends/>


// NOTE: remember to set CORS from storage accunt in azure portal
// <isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}
// </isStorageConfigured>

// <getBlobsInContainer>
// return list of blobs in container to display
const getBlobsInContainer = async (containerClient, containerName="all") => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}
// </getBlobsInContainer>

// <createBlobInContainer>
const createBlobInContainer = async (containerClient, file) => {

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
}
// </createBlobInContainer>

// <uploadFileToBlob>
const uploadFileToBlob = async (file, containerName="all") => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/${sasToken}`
  );

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient, containerName);
};
// </uploadFileToBlob>

export default uploadFileToBlob;
