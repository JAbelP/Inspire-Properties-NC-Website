//creating a log in page using firebase auth
import React from 'react';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../firebaseConfig';

function LoginPage(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleLogin = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            //what does window.location.reload() do?[HUH]
            window.location.reload();
        } catch(error){

            //if error.message is equal to  "Error (auth/user-not-found)." to alert the user "Account not found"
            console.log(`${error.message}`); 
            if(error.message === "Firebase: Error (auth/user-not-found)."){
                             alert("Account not found");
                         }
        }

    }

    const handleSignup = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            //clear the input fields after successful signup
            setEmail('');
            setPassword('');

            //once the user is created, get the user information and POST it to the database called SoftwareAccounts to firebase
            const user =  auth.currentUser;
            console.log("User: ",user);
            //we need to save the email from user which means it needs to await the user
            const uid =  user.uid;
            console.log("Email: ",email);
            console.log("UID: ",uid);

            //send the user.email and user.uid to the database user using the get method 
            await fetch('/api/databaseUsers',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, uid}),
            });
            window.location.reload();
        }
        catch(error)
            {
                console.log(`LOGIN ERROR: ${error.message}`);
            }
    }

    return(
        <div>
            {/* We need to make a box in the middle of the screen with the header Email, and password */}
            <div className="absolute top-1/3 right-1/2 flex flex-col bg-gray-200 p-3 px-11 rounded-lg">
                <h1 className='text-center text-2xl mb-3'>Login</h1>
                <input  className='mb-2 p-1 pl-1 rounded-lg' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input  className='mb-2 p-1 pl-1 rounded-lg' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='flex flex-col gap-y-2 items-center'>
                <button 
                    className=' bg-greenLogo w-fit items-center p-3 px-4 rounded-md'
                    onClick={handleLogin}>Login
                </button>
                <button className='p-3 bg-gray-500 w-fit rounded-md' onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;