import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAFjlJtGE5UOgb4-NF-jTd1XiOg-Q_0sqc",
  authDomain: "auth-facebookgithub.firebaseapp.com",
  projectId: "auth-facebookgithub",
  storageBucket: "auth-facebookgithub.appspot.com",
  messagingSenderId: "439792547749",
  appId: "1:439792547749:web:a87cff2fc9ba60098e5a4c"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();

export const authProvider = async (provider: string) => {
  const providerSelected = provider === 'google' ? googleProvider : provider === 'github' ? githubProvider : facebookProvider

  try {
    const response = await signInWithPopup(auth, providerSelected);
    console.log(response.user)
  } catch (error) {
    console.log({error})
  }
}