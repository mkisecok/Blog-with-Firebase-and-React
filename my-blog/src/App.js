
import './App.css';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';



function App(props) {
 
 
  return (
    
   

    <Router>
      <nav>
        <Link to='/'> Home</Link>
        <Link to='/createpost'> Create Post</Link>
        <Link to='/login'> Login</Link>
      </nav>

    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createpost' element={<CreatePost/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>
  


    

    
  );
}

export default App;
