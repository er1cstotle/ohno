// export default {
//   tasks: {
//     'task-1': { id: 'task-1', content: 'task 1' },
//     'task-2': { id: 'task-2', content: 'task 2' },
//     'task-3': { id: 'task-3', content: 'task 3' },
//     'task-4': { id: 'task-4', content: 'task 4' }
//   },
//   columns: {
//     'column-1': { id: 'column-1', title: 'column 1', taskIDs: ['task-1', 'task-2'] },
//     'column-2': { id: 'column-2', title: 'column 2', taskIDs: ['task-3', 'task-4'] }
//   },
//   columnOrder: ['column-1', 'column-2']
// };
export default {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
};