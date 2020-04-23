import React from 'react';

import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const AddLaneLink = styled(Button)({
  width: 250,
  padding: '6px 16px',
  margin: 5,
  fontSize: 15,
  textTransform: 'none'
});

const NewLaneButton = ({ onClick }) => {
  return <AddLaneLink elevation={0} variant="contained" color={'primary'} onClick={onClick}>Add another column</AddLaneLink>;
};

export default NewLaneButton;


