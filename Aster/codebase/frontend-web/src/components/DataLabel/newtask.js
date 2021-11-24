import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
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

import Box from '@mui/material/Box';
import LinearStepper from './stepper';

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function CreateNewTask({ write }) {
  const [showDialog, setShowDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const createNewTask = () => {
    setShowDialog(false);
  };

  const cancelTask = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setShowDialog(true)}
        startIcon={<Icon icon={plusFill} />}
      >
        New Task
      </Button>

      <Dialog
        fullScreen
        open={showDialog}
        onClose={() => setShowDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create a new task
            </Typography>
            <Button autoFocus color="inherit" onClick={cancelTask}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>




          <Web3ReactProvider getLibrary={getLibrary} >
            <LinearStepper createNewTask={createNewTask} cancelTask={cancelTask} />
          </Web3ReactProvider>





        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateNewTask.propTypes = {
  write: PropTypes.func
};

export default CreateNewTask;
