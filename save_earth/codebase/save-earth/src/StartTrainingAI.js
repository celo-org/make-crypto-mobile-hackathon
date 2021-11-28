const util = require('util');
const fs = require('fs');
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const msRest = require("@azure/ms-rest-js");
// const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
// </snippet_imports>

// <snippet_creds>
const trainingKey = process.env.REACT_APP_TRAINING_KEY;
const endPointTraining = process.env.REACT_APP_TRAINING_ENDPOINT;
// const predictionKey = process.env.REACT_APP_TRAINING_PREDICTION_KEY;
// const predictionResourceId = process.env.REACT_APP_TRAINING_PREDICTION_RESOURCE_ID;
// const endPointPrediction = process.env.REACT_APP_TRAINING_PREDICTION_ENDPOINT;

// </snippet_creds>

// <snippet_vars>
// const publishIterationName = "SaveEarthTrainAI2";
// const setTimeoutPromise = util.promisify(setTimeout);
// </snippet_vars>

// <snippet_auth>
const credentials = new msRest.ApiKeyCredentials({ inHeader: { "Training-key": trainingKey } });
const trainer = new TrainingApi.TrainingAPIClient(credentials, endPointTraining);
// const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
// const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, endPointPrediction);
// </snippet_auth>

// <snippet_create>
const StartTrainingAI = async (allSelectedFiles, yourTagName) => {
    // NOTE: If creating project for the first time,
    // NOTE: You can un-comment the next 3 linrs for sampleProjectId to create new project and get the *sampleProjectId* or ...
    // NOTE: go to the customvision portal to create a new project and get the *sampleProjectId*
    // const createProjectName = "Diverse Datasets";
    // const sampleProject = await trainer.createProject(createProjectName);
    // console.log('sampleProject.id', sampleProject.id)
    // </snippet_create>

    const sampleProjectId = '6a5dab38-ad9b-44a8-b659-23b6045df362';

    // <snippet_tags>
    const sampleProjectTag = await trainer.createTag(sampleProjectId, yourTagName);
    // </snippet_tags>

    // <snippet_upload>

    console.log("Adding images...");
    let fileUploadPromises = [];

    [...allSelectedFiles].forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(sampleProjectId, file, { tagIds: [sampleProjectTag.id] }));
    });

    await Promise.all(fileUploadPromises);
    // </snippet_upload>



    // // <snippet_train>
    // console.log("Training...");
    // let trainingIteration = await trainer.trainProject(sampleProject.id);
    //
    // // Wait for training to complete
    // console.log("Training started...");
    // while (trainingIteration.status == "Training") {
    //     console.log("Training status: " + trainingIteration.status);
    //     await setTimeoutPromise(1000, null);
    //     trainingIteration = await trainer.getIteration(sampleProject.id, trainingIteration.id)
    // }
    // console.log("Training status: " + trainingIteration.status);
    // // </snippet_train>



    // // <snippet_publish>
    // // Publish the iteration to the end point
    // await trainer.publishIteration(sampleProject.id, trainingIteration.id, publishIterationName, predictionResourceId);
    // // </snippet_publish>



    // // <snippet_test>
    // const testFile = fs.readFileSync(`${sampleDataRoot}/Test/test_image.jpg`);
    //
    // const results = await predictor.classifyImage(sampleProject.id, publishIterationName, testFile);
    //
    // // Show results
    // console.log("Results:");
    // results.predictions.forEach(predictedResult => {
    //     console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
    // });
    // // </snippet_test>

    const trainData = {
      sampleProjectTag: sampleProjectTag
    }

    return trainData

// <snippet_function_close>
}

export default StartTrainingAI;
