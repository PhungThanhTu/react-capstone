import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1NR-hJiPaias37CAzZKP_k8CT2pZjq74",
    authDomain: "udemy-react-capstone.firebaseapp.com",
    projectId: "udemy-react-capstone",
    storageBucket: "udemy-react-capstone.appspot.com",
    messagingSenderId: "1065365847178",
    appId: "1:1065365847178:web:165d71668fa565cf0d4173"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup 
    = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => 
{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data not exists
    if(!userSnapshot.exists())
    {
        const {
            displayName,
            email
        } = userAuth;

        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
                })
        }
        catch (error)
        {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}