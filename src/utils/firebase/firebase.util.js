import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8EWe_wh3Zw2_E8I3Yjs537qbLtxM82H0",
    authDomain: "crown-clothing-db-e593c.firebaseapp.com",
    projectId: "crown-clothing-db-e593c",
    storageBucket: "crown-clothing-db-e593c.appspot.com",
    messagingSenderId: "56345742031",
    appId: "1:56345742031:web:9a4aa4124b06b541f6c5ba",
    measurementId: "G-K8L80Q25FZ"
  };
  // Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth= getAuth();
export const signInwithGooglePopup= () => signInWithPopup(auth,provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapShot= await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

   if(!userSnapShot.exists()){
      const {displayName,email} =userAuth;
      const createdAt= new Date();
      try{
        await setDoc(userDocRef, {
           displayName,
           email,
           createdAt
        });
      }catch(error){
          console.log('Error creating the user',error.message);
      }
      }
      return userDocRef;
   }

