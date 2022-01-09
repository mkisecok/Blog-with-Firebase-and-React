import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { addDoc } from 'firebase/firestore';


function CreatePost() {
    const[ title, setTitle ] = useState('');
    const[ postText, setPostText ] = useState('');

    const createPost = async ()=>{
        await addDoc()
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
            <Button variant="contained">Submit Post</Button>

            </Box>
        </div>
    )
}

export default CreatePost
