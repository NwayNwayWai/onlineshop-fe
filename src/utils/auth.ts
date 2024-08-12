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
  localStorage.removeItem("authToken");
  localStorage.removeItem("userInfo");
};
