import { signInwithGooglePopup,createUserDocumentFromAuth}  from "../../utils/firebase/firebase.util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

// signIn
const SignIn = () => {
    const logGoogleUser= async()=>{
     const {user} = await signInwithGooglePopup();
        createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm/>
        </div>
    )
}
export default SignIn;