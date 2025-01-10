export const ADMIN_ROLE = 'SUPER ADMIN';
export const USER_ROLE = 'NORMAL USER';

export const INIT_PERMISSIONS = [
  {
    _id: '648ab415f4328bd3153ee211',
    name: 'Get Company with paginate',
    apiPath: '/api/v1/companies',
    method: 'GET',
    module: 'COMPANIES',
    createdBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2023-06-15T06:47:49.369Z',
    updatedAt: '2023-06-15T06:54:05.131Z',
    __v: 0,
    updatedBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
    deletedBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
  },
  //update
  {
    _id: '648ab415f4328bd3153ee213',
    name: 'Update Company',
    apiPath: '/api/v1/companies/:id',
    method: 'PATCH',
    module: 'COMPANIES',
    createdBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2023-06-15T06:47:49.369Z',
    updatedAt: '2023-06-15T06:54:05.131Z',
    __v: 0,
    updatedBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
  },
  {
    _id: '648ab415f4328bd3153ee214',
    name: 'Delete Company',
    apiPath: '/api/v1/companies/:id',
    method: 'DELETE',
    module: 'COMPANIES',
    createdBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2023-06-15T06:47:49.369Z',
    updatedAt: '2023-06-15T06:54:05.131Z',
    __v: 0,
    updatedBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
    deletedBy: {
      _id: '647b5108a8a243e8191855b5',
      email: 'hoidanit@gmail.com',
    },
  },
];
