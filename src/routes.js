import Dashboard from 'pages/dashboard';
import RetroShow from 'pages/retros/show';

export default [
  { path: '/', page: Dashboard },
  { path: '/r/:id', page: RetroShow }
];


export const dashboardPath = () => '/';
export const retroPath = (id) => `/r/${id}`;
