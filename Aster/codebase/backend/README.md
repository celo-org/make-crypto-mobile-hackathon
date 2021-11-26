## Run the Project
1. `npm install` to install all dependencies  
2. `firebase init` to initialize project with firebase  
3. add firebase configuration file (see below)  
4. `firebase serve` to run serve locally  
or  
5. `firebase deploy` to deploy apis to server

*add firebase configurations in /functions/util/config.js:  

    const firebaseConfig = {
        apiKey: "",   
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };
    module.exports = { firebaseConfig };


## API Documentation
### HTTP-GET
* /task/[task_id] 
    * Return task information as JSON
        * name : string
        * description : string
        * total_price : number
        * number_of_labelers : number
        * contract_address: number
        * Dataset: string[] (array of image urls)
        * number_of_submission: number
* /tasks
    * Returns all the tasks as JSON
        * name : string
        * description : string
        * total_price : number
        * number_of_labelers
        * contract_address: number
        * labels: String[]
        * number_of_submission: number
* /task/data/[task_id]/[user_id]
    * Return data for user_id to label
        * String[] (array of image urls)
*  /task/labels/[task_id]
    * Returns the labels given by the reviewers
        * JSON

### HTTP-POST
* /task
    * Create a new task (image classification only)
    name : string
    description : string
    total_price : number
    number_of_labelers : number
    labels: String[]
* /task/[task_id]/data
    * Upload datasets for a specific task 
        * data: image
* /task/[task_id]/submit
    * Submit the answers to each label that was given to this user
        * data: Object {int: String}
        * user_id: int
