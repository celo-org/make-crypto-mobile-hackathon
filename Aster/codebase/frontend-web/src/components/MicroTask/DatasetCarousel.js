import React, { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadImage from '../DataLabel/uploadImage';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'



import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

import { task_contract } from '../DataLabel/abi';



const injected = new InjectedConnector({
  supportedChainIds: [44787],
})

const web3 = new Web3(Web3.givenProvider);

export default function DatasetCarousel({ task_id }) {
  const [activeStep, setActiveStep] = useState(0);
  const [userLabels, setUserLabels] = useState({
        data: { }
    });
  const [message, setMessage] = useState("");

  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [task, setTask] = useState({});
  const [render, setRender] = useState(false);


  const fetchTask = async () => {
    const task_response = await axios.get(`https://us-central1-aster-38850.cloudfunctions.net/api/task/${task_id}`);
    setTask(task_response.data);
    setRender(true);
  }
  
  useEffect(()=>{
    fetchTask();
  },[]);

  const labelButtonPressed = (answer, index) => {
    console.log(index + " " + answer);
    setUserLabels({
       data: {
           ...userLabels.data,
           [index]: answer
       }
    });
  };

    
  async function connect() {
      try {
        await activate(injected);
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

    
const submitLabels = async () => {
    const submit_data = {
        reviewer: account,
        data: userLabels.data,
    }
    console.log(submit_data);
    
    const response = await axios.post(`https://us-central1-aster-38850.cloudfunctions.net/api/task/${task_id}/submit`, 
        submit_data,
    ).catch(error => {
        console.log(error);
    });

    console.log(response);
    if(response.data == "Data submitted")
        setMessage("task completed!");
    else
        setMessage("submission failed!");
};

const claimReward = async () => {
    const TaskContract = new web3.eth.Contract(task_contract.abi, task.contract_id);
    const tx = await TaskContract.methods.submission(account).send({
        from: account,
    }).catch(error => {
        console.log(error);
    });
    setMessage("reward sent successfully!");
}

  const handleNext = (next, active) => {
    console.log(`we left ${active}, and are now at ${next}`);
   setActiveStep(next);
  };

  const handleBack = (prev, active) => {
    console.log(`we left ${active}, and are now at ${prev}`);
    setActiveStep(prev);
  };


  return (
      <div>
        <div style={{display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center'}}>
            <Button variant="contained" onClick={connect}>Connect to MetaMask</Button>
            <Box sx={{ height: 5}} />
            {   
                active ? 
                <div style={{display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center'}}> 
                    <Typography variant="subtitle1">Connected with <b>{account}</b></Typography>
                    <Button onClick={disconnect} >Disconnect</Button> 
                </div>
                : 
                <Typography variant="subtitle1">Not connected</Typography> 
            }
        </div>
      
      {
          render ? 
          
          <Box sx={{ paddingTop: 5}}>
          <div style={{display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center'}}>
            <Typography variant="h4">{task.name}</Typography>
            <Typography variant="subtitle1">Progress: {activeStep+1}/{task.dataset.length}</Typography>
            <Typography variant="subtitle1">selected: {userLabels.data[activeStep]}</Typography>

          </div>
          <Box sx={{ height: 50}} />
          <Carousel
            navButtonsAlwaysVisible={true}
            cycleNavigation={false}
            autoPlay={false}
            next={ handleNext}
            prev={ handleBack}
          >
           {task.dataset.map((image, index) => (
                <Paper 
                key={index}
                style={{ 
                    paddingLeft: 60, 
                    paddingRight: 60,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    
                    <img style={{width: 165, height: 165}} src={image} />
                    <Box sx={{ height: 20}} />
                    <Grid container style={{
                        justifyContent: "center",
                        alignItems: 'center'}}>
                        {
                            task.labels.map((item, index) => (
                                <Button key={index} variant="contained" style={{margin: 5}}
                                    onClick={() => labelButtonPressed(item, activeStep)}
                                >
                                    {item}
                                </Button>
                            ))
                        }
                    </Grid>
                    
                </Paper>
            ))}
          </Carousel>
          <Box sx={{ height: 5}} />
          {
                (activeStep+1) == task.dataset.length ?
                <div style={{display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center'}}>
                    <Button variant="contained" onClick={submitLabels}>Submit</Button>
                    <Typography>{message}</Typography>
                    {
                        message == "task completed!" ? 
                        <Button variant="contained" onClick={claimReward}>claim reward</Button>
                        : 
                        <></>
                    }
                </div>
                :
                <></>
            }
       </Box> 
       :
       <></>
      }
      </div>
  );
}
