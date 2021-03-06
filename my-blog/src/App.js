
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink,Link } from 'react-router-dom'
import Home from './Pages/Home/Home';
import CreatePost from './Pages/CreatePost/CreatePost';
import Login from './Pages/Login/Login';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import  {signOut}  from 'firebase/auth'
import { auth } from './firebase-config';
import ColorContext from './ColorContext';


function App(props) {
 
  const[isAuth,setIsAuth]=useState(localStorage.getItem('isAuth'));
  const[user, setUser]=useState({img:'', name:''})
  const [randomColor,setRandomColor]=useState('grey')
  const value={randomColor, setRandomColor}
 
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

    <ColorContext.Provider value={value}>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/createpost/:id/edit' element={<CreatePost/>} isAuth={isAuth}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} setUser={setUser}/>}></Route>
      </Routes>
      </ColorContext.Provider>
    </Router>
  );
}

export default App;
