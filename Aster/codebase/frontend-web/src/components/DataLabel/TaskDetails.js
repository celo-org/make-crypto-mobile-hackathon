import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField
} from '@mui/material';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import { display } from '@mui/system';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function TaskDetails({ task_id}) {
  const [showDialog, setShowDialog] = useState(false);
  const [task, setTask] = useState({});
  const [labels, setLabels] = useState([]);
  const [render, setRender] = useState(false);

  const fetchTask = async () => {
    const task_response = await axios.get(`https://us-central1-aster-38850.cloudfunctions.net/api/task/${task_id}`);
    const submission_response = await axios.get(`https://us-central1-aster-38850.cloudfunctions.net/api/task/labels/${task_id}`);
    setTask(task_response.data);
    setLabels(submission_response.data);
    setRender(true);
  }
  
  useEffect(()=>{
    fetchTask();
  },[]);


  return (
    <div>

      <IconButton onClick={() => setShowDialog(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Dialog
        fullScreen
        open={showDialog}
        onClose={() => setShowDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Task Details
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setShowDialog(false)}>
              exit
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
        {
            render ? 
            <div>
                <Typography variant="h3">Task: {task.name}</Typography>
                <Typography variant="h4">Description: {task.description}</Typography>
                <Box sx={{ height: 10 }} />
                <Typography variant="subtitle1">ID: {task.id}</Typography>
                <Typography variant="subtitle1">Contract Address:
                  <a target="_blank" href={`https://alfajores-blockscout.celo-testnet.org/address/${task.contract_id}/transactions`}>{task.contract_id}</a>
                </Typography>
                <Box sx={{ height: 20 }} />
                <Typography variant="string">Total Price: {task.total_price + " CELO"}</Typography>
                <Box sx={{ height: 3 }} />
                <Typography variant="string">Number of Labelers: {task.number_of_labelers}</Typography>
                <Box sx={{ height: 3 }} />
                <Typography variant="string">Price per Labeler: {task.number_of_labelers/task.total_price + " CELO"}</Typography>
                <Box sx={{ height: 30 }} />
                <Typography variant="h4">Dataset</Typography>
                <Typography variant="string">Labels: {task.labels.toString()}</Typography>
                <Box sx={{ height: 3 }} />
                <Typography variant="string">Labeler Submission: {labels.length}/{task.number_of_labelers}</Typography>
                <Box sx={{ height: 20 }} />
                <Typography variant="h6">preview (not finalized)</Typography>
                <Grid container spacing={2}>
                    {task.dataset.map((image, index) => (
                        <Grid item xs={2} style={{
                            display: 'flex', 
                            flexDirection: "column", 
                            justifyContent: 'center', 
                            alignItems: 'center'}}>
                            <div key={index}>
                                <img style={{width: 165, height: 165}} src={image} />
                            </div>
                            {
                                labels[0] ? 
                                <Typography variant="string">{labels[0].replies[index]}</Typography>
                                :
                                <></>
                            }
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ height: 20 }} />
                {
                    labels.length != task.number_of_labelers ?
                    <Button disabled variant="contained">download labeled data</Button>
                    :
                    <Button variant="contained">download labeled data</Button>
                }
                

            </div>
            :
            <></>
        }
       

        </DialogContent>
      </Dialog>
    </div>
  );
}

TaskDetails.propTypes = {
  write: PropTypes.func
};

export default TaskDetails;
