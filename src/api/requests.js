import { chatAppAuth, chatAppNoAuth } from "./index";

// // Auth requests
export const login = async (credentials) => {
  const response = await chatAppNoAuth.post("/login", credentials);
  return response.data; // Return user data and token
};

export const fetchCurrent = async () => {
  const response = await chatAppAuth.get("/current/user");
  return response.data; // Return user data and token
};

export const register = async (userData) => {
  const response = await chatAppNoAuth.post("/register", userData);
  return response.data; // Return user data and token
};

// // Post requests
export const createPost = async (postContent) => {
  const response = await chatAppAuth.post("/posts", postContent);
  return response.data; // Return created post data
};

// // Comment requests
export const replyToPost = async (postId, formData) => {
  const response = await chatAppAuth.post(
    `/posts/${postId}/comments`,
    formData
  );
  return response.data; // Return created reply data
};

export const replyToComment = async (commentId, replyContent) => {
  const response = await chatAppAuth.post(
    `/comments/${commentId}/reply`,
    replyContent
  );
  return response.data; // Return created reply data
};

export const replyToReply = async (replyId, formData) => {
  const response = await chatAppAuth.post(
    `/replies/${replyId}/reply`,
    formData
  );
  return response.data; // Return created reply data
};

export const fetchAllUsers = async () => {
  const response = await chatAppAuth.get("/users"); // Replace with your actual API endpoint
  return response.data; // Return user data
};

// // Function to follow a user
export const userFollow = async (userId) => {
  const response = await chatAppAuth.post(`/follow/${userId}`);
  return response.data; // Return the updated user data or a success message
};

export const getFeeds = async () => {
  const response = await chatAppAuth.get("/feeds");
  return response.data; // Return the updated user data or a success message
};

export const getTrends = async () => {
  const response = await chatAppAuth.get("/trends");
  return response.data; // Return the updated user data or a success message
};

export const passAlongPost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/share`);
  return response.data; // Return created reply data
};

export const quotePost = async (postId, formData) => {
  const response = await chatAppAuth.post(`/posts/${postId}/quote`, formData);
  return response.data; // Return created reply data
};

export const likePost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/like`);
  return response.data; // Return created reply data
};
export const bookMarkPost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/bookmark`);
  return response.data; // Return created reply data
};

export const getSuggestedUsers = () => {
  const response = chatAppAuth.get(`/suggestion`); // Adjust the endpoint to match your backend route
  return response; // Return created reply data
};

export const getUseNotifications = () => {
  const response = chatAppAuth.get(`/notifications`); // Adjust the endpoint to match your backend route
  return response; // Return created reply data
};

// // Post requests
export const getPostById = async (postId) => {
  const response = await chatAppAuth.get(`/posts/${postId}`);
  return response.data; // Return created reply data
};

export const getUserSuggestions = async (query) => {
  const response = await chatAppAuth.get(`/users/suggest?q=${query}`);
  return response.data; // Return created reply data
};

export const readNotification = async (id) => {
  const response = await chatAppAuth.get(`/notification/${id}/read`);
  return response.data; // Return created reply data
};
