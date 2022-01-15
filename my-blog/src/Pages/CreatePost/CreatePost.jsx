import React, { useState , useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { addDoc,collection } from 'firebase/firestore';
import { db ,auth} from '../../firebase-config'
import { useNavigate} from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './CreatePost.css'

function CreatePost({isAuth}) {
    const[ title, setTitle ] = useState('');
    const[ postText, setPostText ] = useState('');
    const[ isLoading, setLoading] = useState(false)
    const navigate=useNavigate();
    // const { id }=useParams();

    const postsCollectionRef = collection(db , 'posts');
   
    const createPost = async ()=>{
        await addDoc(postsCollectionRef, {
            timeStamp:new Date().getTime(),
            title, 
            postText, 
            author:{name: auth.currentUser.displayName , id: auth.currentUser.uid },
            
        });
        setLoading(true)
        setTimeout(()=>{
            navigate('/')
        },2000)
        
    };

    useEffect(() => {
        if(!isAuth){
            navigate('/login')
        }
      
    },[])

    return (
        <div className='createPostPage'>
            {
                isLoading

                ?

                <Alert severity="success" >
                <AlertTitle>Success</AlertTitle>
                The Post has been sent succesfully — <strong>check it out!</strong>
                </Alert>

                :
            
                <Box className='Box' component="form" sx={{'& > :not(style)': { m: 1, width:    '25ch' }, }}autoComplete="off">
                <TextField 
                id="title"
                className='text-area'
                label="Title"
                
                variant="outlined" 
                onChange={(event)=>{setTitle(event.target.value)}}/>

                <TextField 
                id="post" 
                className='text-area'
                label="Text " 
                placeholder='You can write by Markdown'
                multiline rows={6}  
                onChange={(event)=>{setPostText(event.target.value)}}
                />
                <Button variant="contained"  endIcon={<SendIcon />} fullWidth onClick={ createPost } >
                Add Post
                </Button>
                </Box>
            }
        </div>
    )
}

export default CreatePost
