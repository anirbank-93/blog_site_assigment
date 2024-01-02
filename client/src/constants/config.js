// API_SERVER
export const API_SERVER = 'http://localhost:5000/';

// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: 'Loading...',
    message: 'Data is being loaded. Please wait',
  },
  success: {
    title: 'Success',
    message: 'Data successfully loaded',
  },
  responseFailure: {
    title: 'Error',
    message:
      'An error occured while fetching response from server. Please try again.',
  },
  requestFailue: {
    title: 'Error',
    message: 'An error occurred while parsing request data.',
  },
  networkError: {
    title: 'Error',
    message:
      'Unable to connect with server. Please check internet connectivity and try again.',
  },
};

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: {url: '/', method: 'POST/GET/PUT/DELETE', params: true/false, query: true/false, responseType}
export const SERVICE_URLS = {
  userSignup: { url: '/api/auth/signup', method: 'POST' },
  userSignin: { url: '/api/auth/signin', method: 'POST' },
  uploadFile: { url: '/api/file/upload', method: 'POST' },
  createPost: { url: '/api/posts', method: 'POST' },
  getAllPosts: { url: '/api/posts', method: 'GET', params: true },
  getPostById: { url: '/api/posts', method: 'GET', query: true },
  editPost: { url: '/api/posts', method: 'PUT', query: true },
  deletePost: { url: '/api/posts', method: 'DELETE', query: true },
  addComment: { url: '/api/comments', method: 'POST' },
  getPostComments: { url: '/api/comments', method: 'GET', query: true },
  deleteComment: { url: '/api/comments', method: 'DELETE', query: true },
};
