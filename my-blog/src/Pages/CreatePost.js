import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { addDoc,collection } from 'firebase/firestore';
import { db ,auth} from '../firebase-config'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    const[ title, setTitle ] = useState('');
    const[ postText, setPostText ] = useState('');
    const navigate=useNavigate();

    const postsCollectionRef = collection(db , 'posts');

    const createPost = async ()=>{
        await addDoc(postsCollectionRef, {
            title, 
            postText, 
            author:{name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate('/')
    }

    return (
        <div className='createPostPage'>
            <Box  component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, }}autoComplete="off">
            <TextField 
            id="title" 
            label="Title" 
            variant="outlined" 
            onChange={(event)=>{setTitle(event.target.value)}}/>

            <TextField 
            id="post" 
            label="Post..." 
            multiline rows={6}  
            onChange={(event)=>{setPostText(event.target.value)}}
            />
            <Button variant="contained" onClick={ createPost }>Submit Post</Button>

            </Box>
        </div>
    )
}

export default CreatePost
