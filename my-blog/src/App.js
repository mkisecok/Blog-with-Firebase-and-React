
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink,Link } from 'react-router-dom'
import Home from './Pages/Home/Home';
import CreatePost from './Pages/CreatePost/CreatePost';
import Login from './Pages/Login/Login';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import  {signOut}  from 'firebase/auth'
import { auth } from './firebase-config';
import { useEffect } from 'react';


function App(props) {
 
  const[isAuth,setIsAuth]=useState(localStorage.getItem('isAuth'));
  const[user, setUser]=useState({img:'', name:''})
 
  const signUserOut = ()=>{

    signOut(auth).then(()=>{
      
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname='/login'
      
    })
  }
 
  return (
    
   

    <Router>
      <nav>
        <NavLink to='/' > Home</NavLink>
        {!isAuth 
        ? <NavLink to='/login' > Login</NavLink>
        : (
        <>
        <NavLink to='/createpost'> Create Post</NavLink>
        <div className='logout-container'>
        <Link to='#' className='logout-link' onClick={ signUserOut }> Log Out</Link>
        <div className='current-user'>
          <Avatar className='profil-img'
        alt="profil-image"
         src={ user.img }
        sx={{ width: 24, height: 24 }}
      ></Avatar>
          <span>{user.name}</span>
        </div>
        </div>
        </>
        )} 
      </nav>

    
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} setUser={setUser}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
