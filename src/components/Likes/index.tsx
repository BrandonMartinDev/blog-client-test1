// -- == [[ IMPORTS ]] == -- \\

import { FaHeart } from "react-icons/fa";

import './likes.css';


// -- == [[ COMPONENTS ]] == -- \\

type LikesProps = {
    amountOfLikes: number;
}

const Likes = ({ amountOfLikes }: LikesProps) => {

    const handleClick = () => { };

    return (
        <div className="likes" onClick={handleClick}>
            <FaHeart className="heart" />
            <p>{amountOfLikes} {amountOfLikes === 1 ? "like" : "likes"}</p>
        </div>
    )
}

export default Likes