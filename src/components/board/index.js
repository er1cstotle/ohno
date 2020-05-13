import React, { useState } from 'react';
import Trello from 'react-trello';
import { grey } from '@material-ui/core/colors';

import BoardCard from './board-card';
import AddCardLink from './new-lane-button';
import NewCardForm from './new-card-form';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const components = {
  // GlobalStyle: MyGlobalStyle, // global style created with method `createGlobalStyle` of `styled-components`
  // LaneHeader: MyLaneHeader,
  Card: BoardCard,
  NewLaneSection: AddCardLink,
  NewCardForm
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

const Board = (props) => {
  const [open, setOpen] = useState(true);
  const [selectedCardID, setSelectedCardID] = useState(undefined);

  const handleClickOpen = (cardID) => {
    setOpen(true);
    setSelectedCardID(cardID);
  };

  const selectedCard = props.cards[selectedCardID];

  const handleClose = () => {
    setOpen(false);
    setSelectedCardID(undefined);
  };

  const formattedData = formatBoardData(props.laneOrder, props.lanes, props.cards);

  const onEditTitle = (title) => {
    props.onEditCardTitle(selectedCardID, title);
  };

  const onEditNotes = (notes) => {
    props.onEditCardNotes(selectedCardID, notes);
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
        handleLaneDragEnd={props.handleLaneDragEnd}
        handleDragEnd={props.handleDragEnd}
        onLaneAdd={props.onLaneAdd}
        onCardAdd={props.onCardAdd}
        onCardClick={handleClickOpen}
        onCardDelete={props.onCardDelete}
      />

      {selectedCard && <Dialog open={open} onClose={handleClose} aria-labelledby="card-form" fullWidth>
        <DialogTitle>
          <TextField
            fullWidth
            InputProps={{ style: { fontSize: 20 } }}
            onBlur={(e) => onEditTitle(e.target.value)}
            defaultValue={selectedCard.title}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            label={'Notes'}
            fullWidth
            multiline
            rows={5}
            defaultValue={selectedCard.notes}
            variant={'filled'}
            onBlur={(e) => onEditNotes(e.target.value)}
          />
        </DialogContent>

        <DialogActions style={{ backgroundColor: grey[900] }}>
          <Button onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>}
    </>
  );
};

export default Board;