import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

import { boardPath } from 'routes';

import { createBoard, getBoardsForUser } from 'services/boards';

import AddIcon from '@material-ui/icons/Add';
import { Container, Fab, Grid, Slide, Hidden } from '@material-ui/core';
import { Seo, Link } from 'components';

const AddBtn = styled(Fab)({
  position: 'fixed',
  bottom: 48,
  right: 48
});

const Dashboard = ({ user }) => {
  const history = useHistory();
  const [boards, setBoards] = useState({});

  useEffect(() => {
    const getData = async () => {
      const boards = await createBoard(user.uid);

      setBoards(boards);
    };

    getData();
  }, []);

  const createBoard = async () => {
    try {
      const board = await getBoardsForUser(user.uid);
      history.push(boardPath(board.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Dashboard'}/>

      <Grid container>
        <Grid item xs={12} sm={9}>
          {Object.values(boards).map((board) => (
            <Link key={board.id} to={boardPath(board.id)}>
              {board.id}
            </Link>
          ))}
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3}>
            hi
          </Grid>
        </Hidden>
      </Grid>

      <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
        <AddBtn color="primary" aria-label="add" onClick={createBoard}>
          <AddIcon />
        </AddBtn>
      </Slide>

    </Container>
  );
};

export default Dashboard;
