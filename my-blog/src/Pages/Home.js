import {  collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';

function Home() {
    const [ postLists, setPostList ]=useState([]);
    const postsCollectionRef = collection(db , 'posts');


    useEffect(()=>{

        const getPosts= async ()=>{
            const data = await getDocs(postsCollectionRef)
            
            setPostList(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
            //  console.log(data);
        };
        getPosts();
        
    })
    
    return (
        <div className='homePage'>
            {postLists.map((post,i)=>{
            return( 
            <>
            <div className='post' key={ i } >
                <div className="post-header">
                    <h2 className='post-title'>{post.title}</h2> 
                </div>
               
                <div className='text-container'>{post.postText}</div>
                <h4 className='post-sender'>@ {post.author.name}</h4>
                </div>
               
                    
            </>)
        })}
            
        </div>
    )
}

export default Home
