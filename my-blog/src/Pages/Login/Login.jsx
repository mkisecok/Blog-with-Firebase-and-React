import React from 'react'
import Button from '@mui/material/Button';
import { auth, provider } from '../../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import { FcGoogle } from 'react-icons/fc'

function Login({setIsAuth,setUser}) {
    let navigate=useNavigate()

    const signInWithGoogle = ()=>{
        signInWithPopup(auth, provider).then((result)=>{
            localStorage.setItem('isAuth',true)
            setIsAuth(true)
            setUser({img : auth.currentUser.photoURL, name:auth.currentUser.displayName});
            navigate('/')
        })
    }
   return (
        <div className='loginPage'>
           <p >Sign in With Google to Continue</p>
           <Button className='goggle-btn' variant="outlined" onClick={signInWithGoogle}> <FcGoogle className='google-icon'/> &nbsp;  Sign in with Google</Button>
        </div>
    )
}

export default Login
