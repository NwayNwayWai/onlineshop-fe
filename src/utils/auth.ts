// utils/auth.js

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserInfo = () => {
  return localStorage.getItem("userInfo");
};

export const setUserInfo = (token: any, userInfo: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userInfo", userInfo);
};

export const logout = () => {
  // Clear user data from local storage
  localStorage.removeItem("users");

  // Optionally clear other related items
  // localStorage.removeItem("currentUser");

  // Redirect to login page or any other page
  window.location.href = "/login";
};
