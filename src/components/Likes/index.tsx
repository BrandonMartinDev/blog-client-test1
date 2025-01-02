// -- == [[ IMPORTS ]] == -- \\

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import './likes.css';

import useGetBlogInfo from "@hooks/useGetBlogInfo";

import LikeBlog from "@utils/LikeBlog";
import UnlikeBlog from "@utils/UnlikeBlog";
import { useLoggedInUser } from "@contexts/useLoggedInUser";



// -- == [[ COMPONENTS ]] == -- \\

type LikesProps = {
    likedBy: string[];
    blog_id: string;
}

const Likes = ({ likedBy, blog_id }: LikesProps) => {

    const [isLiked, setIsLiked] = useState<boolean | undefined>();
    const [amountOfLikes, setAmountOfLikes] = useState<number>(likedBy.length);

    const navigate = useNavigate();


    // Gets user from useGetLoggedInUser

    const user = useLoggedInUser();


    useEffect(() => {

        if (user && user._id) {
            setIsLiked(likedBy.includes(user._id));
        }

    }, [likedBy]);


    // Fires when clicked

    const handleClick = async () => {

        // If there is no user, redirect to /login

        if (!user) {
            navigate('/login');
            return;
        }

        setIsLiked(undefined);


        // Unlikes blog if blog is already liked

        if (isLiked) {

            await UnlikeBlog(blog_id);
            setIsLiked(false);
            setAmountOfLikes(amountOfLikes - 1);
            console.log(`${user._id} unliked blog '${blog_id}'`);

            return;

        }


        // Likes blog

        await LikeBlog(blog_id);
        setIsLiked(true);
        setAmountOfLikes(amountOfLikes + 1);
        console.log(`${user._id} liked blog '${blog_id}'`);

    };

    return isLiked === undefined
        ? (
            <div className='likes'>
                <p>Loading</p>
            </div>
        ) : (
            <div className={`likes ${isLiked && "liked"}`} onClick={handleClick}>
                <FaHeart className="heart" />
                <p>{amountOfLikes} {amountOfLikes === 1 ? "like" : "likes"}</p>
            </div>
        )

}

export default Likes