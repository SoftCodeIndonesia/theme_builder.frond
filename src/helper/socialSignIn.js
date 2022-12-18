import { getAuth } from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,GithubAuthProvider } from "firebase/auth";
import firebaseApp from '../service/firebase_service';


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const auth = getAuth(firebaseApp);

const socialProvider = {
    google: googleProvider,
    facebookProvider: facebookProvider,
    github: githubAuthProvider,
}


const signIn = async (socialProvider) => {
    return await signInWithPopup(auth, socialProvider);
}

const socialSignIn = {
    socialProvider,
    signIn,
}

export default socialSignIn;
