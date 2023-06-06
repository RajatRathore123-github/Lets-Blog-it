const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Please wait, your data is being loaded",
  },
  success: {
    title: "success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message: "An error occurred while fetching data",
  },
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing data",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect to the server",
  },
};

// API SERVICE CALL

const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "post", method: "GET", query: true },
  updatePost: {
    url: "/update" , method: "PUT" , query: true
  },
  deleteBlog: { url: "delete", method: "DELETE", query: true},
  userComment: { url: "/comment/new", method: "POST"},
  getAllComments: { url: "/comments", method: "GET", query: true},
  removeComment: {url: "/comment/delete", method: "DELETE", query: true}
};

export { API_NOTIFICATION_MESSAGES, SERVICE_URLS };
