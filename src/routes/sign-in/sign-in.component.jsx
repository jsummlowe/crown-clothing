import { signInwithGooglePopup,createUserDocumentFromAuth}  from "../../utils/firebase/firebase.util";
// signIn
const SignIn = () => {
    const logGoogleUser= async()=>{
     const {user} = await signInwithGooglePopSup();
        createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}
export default SignIn;