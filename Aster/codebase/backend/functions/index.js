const functions = require("firebase-functions");
const app = require('express')();
var cors = require('cors')

app.use(cors())

const { 
    getSingleTask,
    getAllTasks,
    getUserTask,
    createTask,
    uploadTaskData,
    userSubmitLabeledData,
    getTaskLabeledDataset,
    uploadImage
} = require('./APIs/tasks')

app.get('/', (req, res) => {
    res.send('Hello World! This is Aster!')
});
 
app.get('/task/:task_id', getSingleTask);
app.get('/tasks', getAllTasks);
app.get('/task/data/:task_id/:user_id', getUserTask);
app.get('/task/labels/:task_id', getTaskLabeledDataset);

app.post('/task', createTask);
// app.post('/task/:task_id/data', uploadTaskData);
app.post('/task/:task_id/submit', userSubmitLabeledData);
app.post('/task/:task_id/data', uploadImage);

exports.api = functions.https.onRequest(app);
