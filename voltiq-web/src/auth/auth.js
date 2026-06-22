import { BACKEND_URL } from "../constants/api";

export const register = (user) => {
  return fetch(`${BACKEND_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const login = (user) => {
  return fetch(`${BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const haveUserAccessToHisAction = (userData, user) => {
  if (userData._id === user._id) {
    return true;
  } else {
    return false;
  }
};

export const isAdmin = (userData) => {
  return userData && userData.role && userData.role === "admin";
};
