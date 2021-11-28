## Run the Project
(Recommended `node js 14+` and `npm 6+`)
1. `npm install` to install all dependencies  
2. `npm start` to start local server


## Important Files 
(under /src)
* /pages/DataLabeling.js
    * the main file for the /datalabeling page, renders task list table, and uses all the following components
* /components/DataLabel/newtask.js 
    * renders "create task" butto and web3 wrapper, wrapping the component inside (stepper.js)
* /components/DataLabel/stepper.js 
    * celo smart contract interaction, task info form
* /components/DataLabel/uploadImage.js 
    * multiple images dataset upload functionalities
* /components/DataLabel/TaskDetails.js
    * show all task information to user


## Template
This project is modified from template Minimal [(Free version)](https://minimal-kit-react.vercel.app/). Distributed under the MIT License. See [LICENSE](https://github.com/minimal-ui-kit/minimal.free/blob/main/LICENSE.md) for more information.
![license](https://img.shields.io/badge/license-MIT-blue.svg)  
