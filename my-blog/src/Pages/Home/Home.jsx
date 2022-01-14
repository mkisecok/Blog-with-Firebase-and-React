import {  collection, getDocs, deleteDoc, doc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Moment from 'react-moment'
import './Home.css'


function Home({isAuth}) {
    const [ postLists, setPostList ]=useState([]);
    const postsCollectionRef = collection(db , 'posts');


    useEffect(()=>{

        const getPosts= async ()=>{
            const data = await getDocs(postsCollectionRef)
            
            setPostList(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
             
        };
        getPosts();
        
    });
    const deletePost = async(id) => {
        const postDoc = doc(db, 'posts', id )
        await deleteDoc(postDoc)
    }
    
    
    return (
        <div className='homePage'>
            {postLists.map((post,i)=>{
            return( 
            <>
            <div className='post' key={ i } >
                <div className="post-header">
                    <h2 className='post-title'>{post.title}</h2>
                     <div className='-quote-icon'>  </div>  
                </div>
                <hr className='first-hr'/>
                <div className='text-container'> <blockquote><p>{post.postText}</p></blockquote></div>
                <div className='delete'>  
                {isAuth && post.author.id === auth.currentUser.uid && 
                    <Button 
                    variant="outlined" 
                    startIcon={<DeleteIcon />} 
                    onClick={()=>{ deletePost(post.id)

                    }}/> }
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
