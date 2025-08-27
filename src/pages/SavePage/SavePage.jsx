import React, { useEffect } from 'react'
import "./SavePage.css";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetSavedPosts } from '../../store/Actions/saveActions';
import SavePostCard from '../../components/SavePostCard/SavePostCard';

const SavePage = () => {
    const navigate = useNavigate();
    const { savedPosts, loading , message } = useSelector((state) => state.SaveReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        if (savedPosts?.length == 0 && !message) {
            dispatch(asyncGetSavedPosts());
            console.log(savedPosts);
        }
    }, [savedPosts, dispatch])

    return (
        <div className='save_page'>
            <header className='save_page_header'>
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <p>My Saves</p>
            </header>
            {savedPosts.length > 0  ?(
                 <div className="save_page_list">
                {savedPosts?.map((post, i) => {
                   return  <SavePostCard key={i} post={post} />
                })}
            </div>
            ):(
                <div>
                    No Saved Posts.
                </div>
            )}
           
        </div>
    )
}

export default SavePage