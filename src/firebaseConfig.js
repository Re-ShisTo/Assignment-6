import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxznmMjhf9FxeO0N6ttqyBre6howOs7L0",
  authDomain: "assignment-6-76fb7.firebaseapp.com",
  projectId: "assignment-6-76fb7",
  storageBucket: "assignment-6-76fb7.firebasestorage.app",
  messagingSenderId: "858247238091",
  appId: "1:858247238091:web:20732ccd93d20ce549264e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await signOut(auth);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { auth, signUp, logIn, logOut, googleProvider, githubProvider };
