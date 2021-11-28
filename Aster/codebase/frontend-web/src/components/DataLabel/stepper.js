import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadImage from './uploadImage';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';



import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

import { factory_contract } from './abi';


const injected = new InjectedConnector({
  supportedChainIds: [44787],
})

const web3 = new Web3(Web3.givenProvider);
const FactoryTaskContract = new web3.eth.Contract(factory_contract.abi, factory_contract.address);


const steps = ['Create Task Contract + Payment', 'Data Details', 'Data Upload'];



export default function LinearStepper({ createNewTask, cancelTask }) {
  const [activeStep, setActiveStep] = useState(0);
  const [taskID, setTaskID] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [numLabeler, setNumLabeler] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);   
  const [newTaskContractAddress, setNewTaskContractAddress] = useState(''); 
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);


  
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  const listenToEvents = async () => {
      console.log('listening for events...');

      FactoryTaskContract.events.allEvents(
          { fromBlock: 'latest', }, 
          (error, event) => {
              if (error)
                  console.log("error while subscribing to event")
              console.log('event: ', event);
              setNewTaskContractAddress(event.returnValues[1]);
          }
      );
  }
    
  async function connect() {
      try {
        await activate(injected);
        listenToEvents();
      } catch (ex) {
        console.log(ex)
      }
  }
  
  async function disconnect() {
      try {
          deactivate()
      } catch (ex) {
          console.log(ex)
      }
  }

    
  const createNewTaskContract = async () => {
      setLoading(true);
      const tx = await FactoryTaskContract.methods.create(numLabeler, totalPrice).send({
          from: account,
          value: web3.utils.toWei(totalPrice.toString(), "ether")
      }).catch(error => {
          console.log(error);
      });
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createNewTask();
    }
    else if(activeStep === steps.length - 2){
      // call backend to create a new task, get task id 
      const taskDetails = {
        name: taskName,
        description: taskDescription,
        total_price: totalPrice,
        number_of_labelers: numLabeler,
        contract_id: newTaskContractAddress,
        labels: labels
      };

      axios.post(`https://us-central1-aster-38850.cloudfunctions.net/api/task`, taskDetails)
          .then(res => {
            console.log("success!!");
            console.log(res);
            setTaskID(res.data);
              
          }).catch(error => {
            console.log(error);
          })

    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleLabels = (e) => {
    const labels = e.target.value;
    const labelsArray = labels.split(', ');
    setLabels(labelsArray);
  }

  return (
    <Box sx={{ width: '100%', paddingLeft: 20, paddingTop: 5, paddingRight: 20 }}>
      <Stepper activeStep={activeStep} orientation="vertical">



        <Step key={steps[0]}>
          <StepLabel>{steps[0]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>

            <div >
              <Button onClick={connect}>Connect to MetaMask</Button>
              {   
                  active ? 
                  <div> 
                      <Typography variant="subtitle1">Connected with <b>{account}</b></Typography>
                      <Button onClick={disconnect} >Disconnect</Button> 
                  </div>
                  : 
                  <Typography variant="subtitle1">Not connected</Typography> 
              }

              <TextField
                  autoFocus
                  margin="dense"
                  id="tasK_name"
                  label="Task Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                      setTaskName(e.target.value);
                  }}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id="task_description"
                  label="Task Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                      setTaskDescription(e.target.value);
                  }}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id="num_labeler"
                  label="Number of Labelers"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                      setNumLabeler(e.target.value);
                  }}
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Total Price (in CELO)"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                      setTotalPrice(e.target.value);
                  }}
              />

              <Button onClick={createNewTaskContract}>create task contract & pay</Button>
              {
                  newTaskContractAddress ? 
                  <div>
                    <Typography variant="subtitle1">task contract created successfully!</Typography>
                    <Typography variant="subtitle1">Contract Address:
                      <a target="_blank" href={`https://alfajores-blockscout.celo-testnet.org/address/${newTaskContractAddress}/transactions`}>{newTaskContractAddress}</a>
                    </Typography>
                  </div>
                  :
                  <> 
                    {loading ? <> 
                    <Typography variant="subtitle1">{"waiting for contract address..."}</Typography>
                    <CircularProgress />
                    </> : <></>}
                  </>
              }

            </div>

              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step key={steps[1]}>
          <StepLabel>{steps[1]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              
              <Typography variant="subtitle1">Data Type</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="classification" />
                <FormControlLabel control={<Checkbox disabled />} label="bounding-box annotation (coming soon)" />
              </FormGroup>
              
              <TextField
                autoFocus
                margin="dense"
                id="labels"
                label="Classification Labels (separated by comma)"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleLabels}
              />
              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>       



        <Step key={steps[2]}>
          <StepLabel>{steps[2]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              
              <UploadImage task_id={taskID}/>
              
              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>


      </Stepper>
    </Box>
  );
}
