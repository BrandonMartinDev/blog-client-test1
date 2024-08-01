// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";

import './articlePreview.css';

import { type Article } from "@custom-types/blog-types";
import { Likes } from "@global-components/exportGlobalComponents";



// -- == [[ COMPONENTS ]] == -- \\ 

const ArticlePreviewLoading = () => {
    return (
        <div className="article-preview loading">
            <img alt="" />
            <div className="info">
                <div className="main-info">
                    <h2 className='title'>Loading blog info...</h2>
                </div>
            </div>
        </div>
    )
}



type ArticlePreviewProps = {
    articleInfo?: Article,
    isLoading?: boolean
}

const ArticlePreview = ({

    articleInfo,
    isLoading

}: ArticlePreviewProps) => {


    // Checks if there is article info or if the component is loading

    if (!articleInfo || isLoading) return <ArticlePreviewLoading />;


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
        <div className="article-preview">

            <img src={coverImage} alt="" />

            <div className="info">

                <div className="main-info">

                    <h2 className='title'>
                        <Link to={`/view/blog/${_id}`}>{title}</Link>
                    </h2>
                    
                    <p className="body-preview">{body.substring(0, 100).replace(/#?/g, "")}...</p>

                </div>

                <div className="sub-info">

                    <div className="left">
                        <Link className="author-name" to={`/user/${author._id}`}>{author.displayName}</Link>
                        <p className="date-created">{new Date(createdAt).toDateString()}</p>
                    </div>

                    <div className="right">
                        {likedBy.length >= 0 && <Likes amountOfLikes={likedBy.length} />}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ArticlePreview