import {  collection, getDocs, deleteDoc, doc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config';
import DeleteIcon from '@mui/icons-material/Delete';
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown';
import './Home.css'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react'
import ColorContext from '../../ColorContext';

function Home({isAuth}) {
    const [ postLists, setPostList ]=useState([]);
    const postsCollectionRef = collection(db , 'posts');
    const { randomColor }=useContext(ColorContext)
   
   
    
    useEffect(()=>{

        const getPosts= async ()=>{
            const data = await getDocs(postsCollectionRef)
             
            setPostList(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
             
    
        };
        getPosts();
        
    });
    const deletePost = async(id) => {
        const postDoc = doc(db, 'posts', id );
        console.log(postDoc);
        await deleteDoc(postDoc)
    }
    
    
    
    
    return (
        <div className='homePage'>
            {postLists.map((post,i)=>{
              
            return( 
            <>
            <div className='post' key={ i } >
            <Avatar sx={{ backgroundColor:randomColor,width: 56, height: 56  }} className='quote-icon' variant="rounded"><FormatQuoteIcon /> </Avatar> 
                <div className="post-header">
                     
                    <h2 className='post-title'>{post.title}</h2>
                </div>
                <hr className='first-hr'/>
                <div className='text-container'> <ReactMarkdown>{post.postText}</ReactMarkdown></div>
                <div className='delete'>  
                    {isAuth && post.author.id === auth.currentUser.uid && 

                        <DeleteIcon  fontSize="large" sx={{cursor:'pointer', color:'red'}} onClick={()=>{  deletePost(post.id)
                        }} />
                    }
                </div>
                
               <hr className='last-hr'/>
               <div className='post-footer'>
               <div className='post-sender'>From: {post.author.name}</div>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <div>Created:<Moment fromNow >{new Date(post.timeStamp)}</Moment></div> 
               
               </div>
            </div>
            </>)
        })}
            
        </div>
    )
}

export default Home
