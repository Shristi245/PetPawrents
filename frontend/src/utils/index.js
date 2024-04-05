import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import storage from "../config/firebaseConfig.js";

export const getLogInDetailsFromLocalStorage = () => {
  const loginDetails = localStorage.getItem("loginDetails");

  if (loginDetails) {
    return JSON.parse(loginDetails);
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("loginDetails");
};

export const updloadImageToFirebase = async (imgFile) => {
  const imageRef = storageRef(storage, `/files/${uuid()}_${imgFile.name}`);
  const snapshot = await uploadBytes(imageRef, imgFile);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};


export { default as useDebounce } from "./hooks/useDebounce.jsx";

export * from "./handleCartOperations.js"
