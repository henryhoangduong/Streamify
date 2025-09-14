import { axiosInstance } from "./axios";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.get("/auth/logout");
  return res.data;
};
export const getUserFriends = async () => {
  const res = await axiosInstance.get("/user/friends");
  return res.data;
};
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};

export const getOutGoingFriendReqs = async () => {
  const res = await axiosInstance.get("/user/outgoing-friend-requests");
  return res.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(
    `/users/outgoing-friend-requests/${userId}`
  );
  return res.data;
};

export const getFriendRequest = async () => {
  const res = await axiosInstance.get(`/user/outgoing-friend-requests`);
  return res.data;
};

export const accpetFriendRequest = async (requestId) => {
  const res = await axiosInstance.get(
    `/user/friend-request/${requestId}/accept`
  );
  return res.data;
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};
