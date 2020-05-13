import React, { useState } from 'react';

import { Paper, Card, Typography, Fab, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  card: {
    padding: 15,
    marginBottom: 5,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      '& $badge': {
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity 0.5s'

      }
    }
  },
  badge: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.5s',
    backgroundColor:'red',
    height: 20,
    padding: 2,
    color: 'white',
    top: 0,
    right: 0,
    position: 'absolute',
    borderBottomLeftRadius: 4
  },
  icon: {
    fontSize: 16
  },
  title: {
    width: 250
  }
});

const CloseButton = styled(CloseIcon)({
  marginLeft: 4,
  '&:hover': {
    color: 'white'
  }
});

// cardDraggable
const NewCardForm = ({ onCancel, onAdd }) => {
  const [title, setTitle] = useState('');

  console.log(title);


  const handleAdd = () => {
    onAdd({
      title
    });
  };

  return(
    <>
      <Paper>
        <TextField
          // label="Description"
          style={{ width: '100%' }}
          // multiline
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          rows={4}
          autoFocus
          variant={'outlined'}
        />
      </Paper>

      <Grid container alignItems={'center'} style={{ marginTop: 8 }}>

        <Button onClick={handleAdd} variant={'contained'} color={'secondary'} size={'small'}>Add Card</Button>
        <CloseButton onClick={onCancel}/>
      </Grid>
    </>
  );
};

export default NewCardForm;
