
// Mock user data for the admin panel
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-08-15T10:23:42Z',
    joinDate: '2022-01-10T08:15:30Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    lastLogin: '2023-08-14T14:45:21Z',
    joinDate: '2022-02-18T11:30:00Z'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-07-22T09:12:45Z',
    joinDate: '2022-03-05T15:45:12Z'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-15T11:50:32Z',
    joinDate: '2022-03-12T09:20:15Z'
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'moderator',
    status: 'active',
    lastLogin: '2023-08-14T16:35:10Z',
    joinDate: '2022-04-08T10:10:10Z'
  },
  {
    id: '6',
    name: 'Sophia Garcia',
    email: 'sophia@example.com',
    role: 'user',
    status: 'pending',
    lastLogin: '2023-08-10T13:22:45Z',
    joinDate: '2022-05-20T14:30:00Z'
  },
  {
    id: '7',
    name: 'David Martinez',
    email: 'david@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-13T09:15:30Z',
    joinDate: '2022-06-15T11:45:22Z'
  },
  {
    id: '8',
    name: 'Olivia Taylor',
    email: 'olivia@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-07-30T15:40:12Z',
    joinDate: '2022-07-01T08:30:45Z'
  },
  {
    id: '9',
    name: 'William Anderson',
    email: 'william@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-14T10:20:35Z',
    joinDate: '2022-08-12T13:15:30Z'
  },
  {
    id: '10',
    name: 'Emma Thomas',
    email: 'emma@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-15T08:45:20Z',
    joinDate: '2022-09-05T09:50:15Z'
  },
  {
    id: '11',
    name: 'James Jackson',
    email: 'james@example.com',
    role: 'user',
    status: 'pending',
    lastLogin: '2023-08-11T14:10:25Z',
    joinDate: '2022-10-18T16:20:00Z'
  },
  {
    id: '12',
    name: 'Ava White',
    email: 'ava@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-14T11:30:40Z',
    joinDate: '2022-11-22T10:05:30Z'
  },
  {
    id: '13',
    name: 'Alexander Harris',
    email: 'alex@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-08-01T09:25:15Z',
    joinDate: '2022-12-10T14:40:22Z'
  },
  {
    id: '14',
    name: 'Mia Martin',
    email: 'mia@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-13T16:50:30Z',
    joinDate: '2023-01-05T11:35:45Z'
  },
  {
    id: '15',
    name: 'Ethan Thompson',
    email: 'ethan@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-15T13:15:50Z',
    joinDate: '2023-02-18T08:55:10Z'
  },
  {
    id: '16',
    name: 'Isabella Clark',
    email: 'isabella@example.com',
    role: 'user',
    status: 'pending',
    lastLogin: '2023-08-12T10:40:20Z',
    joinDate: '2023-03-20T15:30:00Z'
  },
  {
    id: '17',
    name: 'Jacob Rodriguez',
    email: 'jacob@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-14T09:05:15Z',
    joinDate: '2023-04-11T12:25:30Z'
  },
  {
    id: '18',
    name: 'Charlotte Lewis',
    email: 'charlotte@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-07-25T14:30:45Z',
    joinDate: '2023-05-08T09:15:20Z'
  },
  {
    id: '19',
    name: 'Daniel Lee',
    email: 'daniel@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-13T11:20:35Z',
    joinDate: '2023-06-14T10:40:15Z'
  },
  {
    id: '20',
    name: 'Amelia Walker',
    email: 'amelia@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-15T15:10:25Z',
    joinDate: '2023-07-22T13:50:30Z'
  }
];
