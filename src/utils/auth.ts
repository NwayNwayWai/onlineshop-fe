// import { User } from "@/types/User";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import CryptoJS from "crypto-js";

export const setUserInfo = (userInfo: any) => {
  const expires = new Date();
  expires.setDate(expires.getDate());
  const cipherUserInfo = CryptoJS.AES.encrypt(
    JSON.stringify(userInfo),
    "userInfo"
  ).toString();
  setCookie("userInfo", cipherUserInfo, {
    expires,
  });
};

export const getUserInfo = () => {
  const userinfo = getCookie("userInfo");
  if (!userinfo) {
    return null;
  }
  const userInfoBytes = CryptoJS.AES.decrypt(userinfo, "userInfo");
  const decryptedUserInfo = JSON.parse(
    userInfoBytes.toString(CryptoJS.enc.Utf8)
  );
  return decryptedUserInfo;
};

export const getToken = () => {
  const session = getCookie("token");
  if (!session) return false;
  const bytes = CryptoJS.AES.decrypt(session, "token");
  try {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.error("error", err);
  }
};

export const logout = () => {
  deleteCookie("token");
  deleteCookie("userInfo");
};
