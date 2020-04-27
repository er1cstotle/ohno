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
  DialogTitle,
  Typography } from '@material-ui/core';


const components = {
  // GlobalStyle: MyGlobalStyle, // global style created with method `createGlobalStyle` of `styled-components`
  // LaneHeader: MyLaneHeader,
  Card: BoardCard,
  NewLaneSection: AddCardLink
  // BoardWrapper: BoardWrapper

};

const formatBoardData = (laneOrder, lanesMap, cardsMap) => {
  const formattedLanes = laneOrder
    .filter((laneID) => lanesMap[laneID])
    .map((laneID) => {
      const lane = lanesMap[laneID];

      lane.cards = lane.cardIDs
        .filter((cardID) => cardsMap[cardID])
        .map((cardID) => {
          // react-trello only initializes laneId on load.
          // https://github.com/rcdexta/react-trello/issues/325
          return {
            ...cardsMap[cardID],
            laneId: lane.id
          };
        });

      return lane;
    });

  return {
    lanes: formattedLanes
  };
};


const Board = ({ laneOrder, lanes, cards, onLaneAdd, handleLaneDragEnd, onCardAdd, handleDragEnd, onCardEdit, onCardDelete }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCardID, setSelectedCardID] = React.useState(false);

  const handleClickOpen = (cardID) => {
    setOpen(true);
    setSelectedCardID(cardID);
  };

  const selectedCard = cards[selectedCardID];

  console.log(selectedCard);


  const handleClose = () => {
    setOpen(false);
    setSelectedCardID(undefined);
  };

  const formattedData = formatBoardData(laneOrder, lanes, cards);

  const handleCardEdit = () => {
    onCardEdit(selectedCard);
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
        data={formattedData}
        handleLaneDragEnd={handleLaneDragEnd}
        handleDragEnd={handleDragEnd}
        onLaneAdd={onLaneAdd}
        onCardAdd={onCardAdd}
        onCardClick={handleClickOpen}
        onCardDelete={onCardDelete}
      />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{selectedCard ? selectedCard.title : ''}</DialogTitle>


        <DialogContent>
          <DialogContentText>
            sdfnsdlfnsdlknflksdfnlksdnflksndflk
          </DialogContentText>
          <Typography>
            Details
          </Typography>
          <TextField
            // label="Description"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCardEdit} color="primary">
            Save
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};


export default Board;