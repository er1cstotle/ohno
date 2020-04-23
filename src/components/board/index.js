import React from 'react';
import Trello from 'react-trello';

import BoardCard from './board-card';
import AddCardLink from './new-lane-button';

import { Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';


const components = {
  // GlobalStyle: MyGlobalStyle, // global style created with method `createGlobalStyle` of `styled-components`
  // LaneHeader: MyLaneHeader,
  Card: BoardCard,
  NewLaneSection: AddCardLink
  // BoardWrapper: BoardWrapper

};

const Board = ({ data, onLaneAdd, handleLaneDragEnd, onCardAdd, handleDragEnd, onCardClick, onCardDelete }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Trello
        style={{ backgroundColor: 'white' }}
        editLaneTitle
        draggable
        editable
        canAddLanes
        components={components}
        data={data}
        handleLaneDragEnd={handleLaneDragEnd}
        handleDragEnd={handleDragEnd}
        onLaneAdd={onLaneAdd}
        onCardAdd={onCardAdd}
        onCardClick={() => {
          handleClickOpen();
          onCardClick();
        }}
        onCardDelete={onCardDelete}
      />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default Board;