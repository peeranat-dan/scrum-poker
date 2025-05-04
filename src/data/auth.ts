import {
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  getAuth,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

async function signInAnonymously() {
  return await firebaseSignInAnonymously(auth);
}

async function signOut() {
  return await firebaseSignOut(auth);
}

export { auth, signInAnonymously, signOut };
