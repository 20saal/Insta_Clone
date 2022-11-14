import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBwQ7Qyc2wIalWgcMDzWCFSOXL7rtOWRE",
  authDomain: "instagram-clone-dcab3.firebaseapp.com",
  projectId: "instagram-clone-dcab3",
  storageBucket: "instagram-clone-dcab3.appspot.com",
  messagingSenderId: "69776820571",
  appId: "1:69776820571:web:f0847d396a583ff24df27e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//access storage bucket
export const storage = getStorage(app);
