
import {useInsertionEffect, useState} from 'react';
import { createAuthUserWithEmailandPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';
import FormInput
 from '../form-input/form-input.component';
 import Button from '../button/button.component';

const defaultFormFields={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',

};

const SignUpForm = () =>{
    const[formFields,setFormFields] = useState(defaultFormFields);
    const{displayName,email,password,confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () =>{
          setFormFields(defaultFormFields);
    }
    const handleChange=(event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]: value});
    }
    const handleSubmit= async (event)=>{
         event.preventDefault(); 
       if(password != confirmPassword){
           alert('Password do no match');
       }
       try{
            const {user} = await createAuthUserWithEmailandPassword(email,password);
            console.log(user);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
       }catch(error){
          if(error.code=='auth/email-already-in-use'){
              alert('Cannot create user email already in use');
          }else{
          console.log('User creation encountered an error');
          }
       }
    };

    return (
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with you email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="DisplayName" type="text" required onChange={handleChange} name= "displayName" value={displayName}/>
            
            <FormInput label="Email" type="email" required onChange={handleChange} name= "email" value={email}/>

            <FormInput label="Password" type="password" required onChange={handleChange} name= "password" value={password}/>

            <FormInput label ="Confirm Password" type="password"  required onChange={handleChange} name= "confirmPassword" value={confirmPassword}/>
            
            <Button buttonType='google' type="submit">Sign Up</Button>
        </form>
      </div>
        
    );
};
export default SignUpForm;
