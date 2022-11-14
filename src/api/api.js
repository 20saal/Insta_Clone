import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from ".././firebase";
import { ArrangeData, ArrangeDetail } from "../helper/helpers";

const projectKey = "AIzaSyCBwQ7Qyc2wIalWgcMDzWCFSOXL7rtOWRE";
const signUpUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBwQ7Qyc2wIalWgcMDzWCFSOXL7rtOWRE";

const loginUrl =
  " https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBwQ7Qyc2wIalWgcMDzWCFSOXL7rtOWRE";

export async function sendSignUpRequest(signupData) {
  const response = await fetch(signUpUrl, {
    method: "POST",
    body: JSON.stringify({ ...signupData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const data = await response.json();
  return data;
}

export async function sendLoginRequest(loginData) {
  const response = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({ ...loginData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json(); //json object error={error:{code:'', mesage:''}}
    // console.log(error.error.code);
    throw error.error;
  }
  const data = await response.json();
  return data;
}

//fetch posts data
const databaseUrl =
  "https://instagram-clone-dcab3-default-rtdb.firebaseio.com/";
export async function sendProfileUserData(userData) {
  const response = await fetch(
    `${databaseUrl}/userData/${userData.userName}/profile.json`,
    {
      method: "POST",
      body: JSON.stringify({ ...userData }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const data = await response.json();
  return data;
}

export async function fetchUserData() {
  const response = await fetch(`${databaseUrl}/userData.json`);
  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const data = await response.json();
  const arrangedData = ArrangeData(data);
  return arrangedData;
}

export async function sendUserPostReq(userData) {
  const response = await fetch(
    `${databaseUrl}/userData/${userData.userName}/posts.json`,
    {
      method: "POST",
      body: JSON.stringify({ post: userData.post }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const data = await response.json();
  return data;
}

export async function fetchUserDetail(userName) {
  const response = await fetch(`${databaseUrl}/userData/${userName}.json`);
  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const data = await response.json();
  const arrangedData = ArrangeDetail(data);
  return { ...arrangedData, userName };
}
