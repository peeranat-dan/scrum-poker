import {
  signInAnonymously as firebaseSignInAnonymously,
  signInWithPopup as firebaseSignInWithPopup,
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

async function signInAnonymously() {
  return await firebaseSignInAnonymously(auth);
}

async function signOut() {
  return await firebaseSignOut(auth);
}

async function signInWithGoogle() {
  return await firebaseSignInWithPopup(auth, googleAuthProvider);
}

async function linkWithGoogle() {
  if (!auth.currentUser) {
    throw new Error('User is not authenticated');
  }

  return await linkWithPopup(auth.currentUser, googleAuthProvider);
}

export { auth, linkWithGoogle, signInAnonymously, signInWithGoogle, signOut };
