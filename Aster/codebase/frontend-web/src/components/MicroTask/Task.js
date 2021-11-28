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
import DatasetCarousel from './DatasetCarousel'

import Box from '@mui/material/Box';

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function Task({ task_id}) {
  const [showDialog, setShowDialog] = useState(false);

  const createNewTask = () => {
    setShowDialog(false);
  };

  const cancelTask = () => {
    setShowDialog(false);
  };

  return (
    <div>

      <Button onClick={() => setShowDialog(true)} size="medium" variant="contained">Select</Button>

      <Dialog
        fullScreen
        open={showDialog}
        onClose={() => setShowDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Task
            </Typography>
            <Button autoFocus color="inherit" onClick={cancelTask}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>


          <Web3ReactProvider getLibrary={getLibrary} >
            <DatasetCarousel task_id={task_id}/>
          </Web3ReactProvider>



        </DialogContent>
      </Dialog>
    </div>
  );
}

Task.propTypes = {
  write: PropTypes.func
};

export default Task;
