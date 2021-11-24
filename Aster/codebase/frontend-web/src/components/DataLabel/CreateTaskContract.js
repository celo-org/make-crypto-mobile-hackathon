/* this component is not used since i was unable to pass the state variables in this component back to its parent,
most likelt because its parent is a stepper and once this step close the state variables are gone
*/


import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';

import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

import { factory_contract } from './abi';


const injected = new InjectedConnector({
  supportedChainIds: [44787],
})

const web3 = new Web3(Web3.givenProvider);
const FactoryTaskContract = new web3.eth.Contract(factory_contract.abi, factory_contract.address);

 
const CreateTaskContract = ({ getTaskInfo }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [numLabeler, setNumLabeler] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);   
    const [newTaskContractAddress, setNewTaskContractAddress] = useState(''); 
    
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    const listenToEvents = async () => {
        console.log('listening for events...');
        console.log('name from child comp: ',  taskName);

        FactoryTaskContract.events.allEvents(
            { fromBlock: 'latest', }, 
            (error, event) => {
                if (error)
                    console.log("error while subscribing to event")
                console.log('event: ', event);
                setNewTaskContractAddress(event.returnValues[1]);
                sendTaskInfoBack();
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

    
    const createNewTask = async () => {
        console.log('name from child comp inside createNewTask function: ',  taskName);

        const tx = await FactoryTaskContract.methods.create(numLabeler, totalPrice).send({
            from: account,
            value: web3.utils.toWei(totalPrice.toString(), "ether")
        }).catch(error => {
            console.log(error);
        });
    }

    const sendTaskInfoBack = () => {
        console.log('name from child comp: ',  taskName);
        getTaskInfo({
            name: taskName,
            description: taskDescription,
            total_price: totalPrice,
            number_of_labelers: numLabeler,
            contract_id: newTaskContractAddress,
        });
    };
 
  return (
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

        <Button onClick={createNewTask}>create task contract & pay</Button>
        {
            newTaskContractAddress ? 
            <div>
            <Typography variant="subtitle1">task contract created successfully!</Typography>
            <Typography variant="subtitle1">Contract Address: {newTaskContractAddress}</Typography>
            </div>
            :
            <> </>
        }

    </div>
  );
};

// function CreateTaskContract({ getTaskInfo }) {
//     return (
//         <Web3ReactProvider getLibrary={getLibrary} >
//             <TaskDetails getTaskInfo={getTaskInfo}/>
//         </Web3ReactProvider>
//     );
//   }

export default CreateTaskContract;
