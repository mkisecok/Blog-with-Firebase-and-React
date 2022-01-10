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
            <div className='post' key={ i } > {post.title}</div>
                <div>{post.postText}</div>
                    
            </>)
        })}
            
        </div>
    )
}

export default Home
