/* eslint-disable react/react-in-jsx-scope */
export const mobiletabs = [
  {
    name: 'Dashboard',
    icons: (
      <i className='text-purple-600 fas fa-th-large' />
    ),
    links: '/dashboard',
    badge: 0,
  },
  {
    name: 'Appointments',
    icons: (
      <i className='text-purple-600 fas fa-hands-helping' />
    ),
    links: '/appointments',
    badge: 0,
    subList: [
      {
        desc: 'chat',
        badge: 0,
      },
      {
        desc: 'reminder',
        badge: 0,
      },
    ],
  },
  {
    name: 'Profile',
    icons: (
      <i className='text-purple-600 fas fa-id-card-alt' />
    ),
    links: '/settings',
    badge: 0,
  },
  {
    name: 'Report',
    icons: (
      <i className='text-purple-600 fas fa-users-cog' />
    ),
    links: '/report',
    badge: 0,
  },
];
