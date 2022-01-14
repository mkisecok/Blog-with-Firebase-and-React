import React, { useState , useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { addDoc,collection } from 'firebase/firestore';
import { db ,auth} from '../../firebase-config'
import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import './CreatePost.css'

function CreatePost({isAuth}) {
    const[ title, setTitle ] = useState('');
    const[ postText, setPostText ] = useState('');
    const navigate=useNavigate();

    const postsCollectionRef = collection(db , 'posts');
    console.log(auth)
    const createPost = async ()=>{
        await addDoc(postsCollectionRef, {
            timeStamp:new Date().getTime(),
            title, 
            postText, 
            author:{name: auth.currentUser.displayName , id: auth.currentUser.uid },
            
        });
        navigate('/')
    };

    useEffect(() => {
        if(!isAuth){
            navigate('/login')
        }
      
    },[])

    return (
        <div className='createPostPage'>
            <Box className='Box' component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, }}autoComplete="off">
            <TextField 
            id="title"
            className='text-area'
            label="Title" 
            variant="outlined" 
            onChange={(event)=>{setTitle(event.target.value)}}/>

            <TextField 
            id="post" 
            className='text-area'
            label="Post..." 
            multiline rows={6}  
            onChange={(event)=>{setPostText(event.target.value)}}
            />
            <Button variant="contained"  endIcon={<SendIcon />} fullWidth onClick={ createPost } >
            Send Post
            </Button>
            </Box>
        </div>
    )
}

export default CreatePost
