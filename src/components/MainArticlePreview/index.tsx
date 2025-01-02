// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";

import './mainArticlePreview.css';

import { type Article } from "@custom-types/blog-types";
import { Likes, UsernameLink } from "@global-components/exportGlobalComponents";



// -- == [[ COMPONENTS ]] == -- \\ 

const MainArticlePreviewLoading = () => {
    return (
        <div className="main-article-preview loading">

            <img />

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

                    <UsernameLink displayName={author.displayName} userId={author._id} />
                    <p className="date-created">{new Date(createdAt).toDateString()}</p>

                    {likedBy.length >= 0 && <Likes likedBy={likedBy} blog_id={_id} />}

                </div>

            </div>

        </div>
    )
}

export default MainArticlePreview