// -- == [[ IMPORTS ]] == -- \\

import { FaHeart } from "react-icons/fa";

import './likes.css';


// -- == [[ COMPONENTS ]] == -- \\

type LikesProps = {
    amountOfLikes: number;
}

const Likes = ({ amountOfLikes }: LikesProps) => {

    return (
        <div className="likes">
            <FaHeart className="heart" />
            <p>{amountOfLikes} likes</p>
        </div>
    )
}

export default Likes