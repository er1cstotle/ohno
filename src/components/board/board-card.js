import React from 'react';

import { Paper, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

// showDeleteButton,
// style,
// tagStyle,
// onClick,
// onDelete,
// className,
// id,
// title,
// label,
// description,
// tags,
// cardDraggable
const BoardCard = ({ id, title, onClick, onDelete }) => {
  const classes = useStyles();
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return(
    <Card className={classes.card} data-id={id} onClick={onClick}>
      <Paper className={classes.badge} square elevation={0} onClick={handleDelete}>
        <CloseIcon className={classes.icon}/>
      </Paper>
      <Typography className={classes.title} noWrap variant={'body2'}>{title}</Typography>
    </Card>
  );
};

export default BoardCard;
