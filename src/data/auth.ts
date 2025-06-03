import {
  signInAnonymously as firebaseSignInAnonymously,
  signInWithPopup as firebaseSignInWithPopup,
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

async function signInAnonymously() {
  return await firebaseSignInAnonymously(auth);
}

async function signOut() {
  return await firebaseSignOut(auth);
}

async function signInWithGoogle() {
  return await firebaseSignInWithPopup(auth, new GoogleAuthProvider());
}

export { auth, signInAnonymously, signInWithGoogle, signOut };
