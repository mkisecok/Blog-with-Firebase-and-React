import React from 'react'
import Button from '@mui/material/Button';
import { auth, provider } from '../../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Login({setIsAuth}) {
    let navigate=useNavigate()

    const signInWithGoogle = ()=>{
        signInWithPopup(auth, provider).then((result)=>{
            localStorage.setItem('isAuth',true)
            setIsAuth(true)
            navigate('/')
        })
    }
   return (
        <div className='loginPage'>
           <p>Sign in With Google to Continue</p>
           <Button className='login-with-goggle-btn' variant="contained" onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
    )
}

export default Login
