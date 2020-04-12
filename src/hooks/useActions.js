import { useState } from 'react';

const useActions = (actions, initial) => {
  const [state, setState] = useState(initial);
  const wired = {};

  for (const action in actions) {
    wired[action] = async (...params) =>
      setState(await actions[action](state, ...params));
  }
  return [state, wired];
};

export default useActions;