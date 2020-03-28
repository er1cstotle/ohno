import {
  useLocation
} from 'react-router-dom';

export default () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const paramsMap = {};

  searchParams.forEach((val, key) => {
    paramsMap[key] = val;
  });

  return paramsMap;

};
