// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";

import './mainArticlePreview.css';

import { type Article } from "@custom-types/blog-types";
import { Likes } from "@global-components/exportGlobalComponents";



// -- == [[ COMPONENTS ]] == -- \\ 

const MainArticlePreviewLoading = () => {
    return (
        <div className="main-article-preview loading">
            <img alt="" />
            <div className="info">
                <div className="main-info">
                    <h2 className='title'>Loading blog info...</h2>
                    <p className="body-preview">Please be patient... :)</p>
                </div>
            </div>
        </div>
    )
}



type MainArticlePreviewProps = {
    articleInfo?: Article,
    isLoading?: boolean
}

const MainArticlePreview = ({

    articleInfo,
    isLoading

}: MainArticlePreviewProps) => {


    // Checks if there is article info or if the component is loading

    if (!articleInfo || isLoading) return <MainArticlePreviewLoading />;


    // Destructures articleInfo

    const {

        _id,
        author,
        coverImage,
        title,
        body,
        likedBy,
        createdAt

    } = articleInfo;

    return (
        <div className="main-article-preview">

            <img src={coverImage} alt="" />

            <div className="info">

                <div className="main-info">

                    <h2 className='title'>
                        <Link to={`/view/blog/${_id}`}>{title}</Link>
                    </h2>

                    <p className="body-preview">{body.substring(0, 233).replace(/#?/g, "")}...</p>

                </div>

                <div className="sub-info">

                    <Link className="author-name" to={`/user/${author._id}`}>{author.displayName}</Link>
                    <p className="date-created">{new Date(createdAt).toDateString()}</p>

                    {likedBy.length >= 0 && <Likes amountOfLikes={likedBy.length} />}

                </div>

            </div>

        </div>
    )
}

export default MainArticlePreview