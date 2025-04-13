import {
  signInAnonymously as firebaseSignInAnonymously,
  getAuth,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

async function signInAnonymously() {
  return await firebaseSignInAnonymously(auth);
}

export { auth, signInAnonymously };
