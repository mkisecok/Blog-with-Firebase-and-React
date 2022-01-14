
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink,Link } from 'react-router-dom'
import Home from './Pages/Home/Home';
import CreatePost from './Pages/CreatePost/CreatePost';
import Login from './Pages/Login/Login';
import { useState } from 'react';
import  {signOut}  from 'firebase/auth'
import { auth } from './firebase-config';


function App(props) {
 
  const[isAuth,setIsAuth]=useState(localStorage.getItem('isAuth'));

 

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
        ? <NavLink to='/login' className='login-link'> Login</NavLink>
        : (
        <>
        <NavLink to='/createpost'> Create Post</NavLink>
        <Link to='#' className='login-link' onClick={ signUserOut }> Log Out</Link>
        </>
        )} 
      </nav>

    
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
