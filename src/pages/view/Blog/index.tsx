// -- == [[ IMPORTS ]] == -- \\

import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import './viewBlog.css';

import useGetBlogInfo from "@hooks/useGetBlogInfo";

import UsernameLink from "@global-components/UsernameLink";
import Likes from "@global-components/Likes";
import EditButton from "@global-components/EditButton";



// -- == [[ COMPONENTS ]] == -- \\

const ViewBlogPageError = () => {
    return (
        <div className="container">
            <h1>There was an error loading blog</h1>
        </div>
    )
}

const ViewBlogPageLoading = () => {
    return (
        <div className="container">
            <h1>Loading blog...</h1>
        </div>
    )
}

const ViewBlogPage = () => {

    const { blog_id } = useParams();
    if (!blog_id) return <ViewBlogPageError />;

    const { blogInfo, err } = useGetBlogInfo(blog_id);

    if (err) {
        console.warn(err);
        return <ViewBlogPageError />;
    }

    if (!blogInfo) return <ViewBlogPageLoading />;

    const {

        _id,

        author,
        createdAt,

        coverImage,
        title,
        body,

        comments,

        likedBy,

    } = blogInfo;

    return (
        <article className="container">

            <main className="view-blog_main">

                <h1 className="title">{title}</h1>

                <div className="header">
                    <UsernameLink displayName={author.displayName} userId={author._id} />
                    <EditButton id={_id} />
                    <Likes amountOfLikes={likedBy.length} />
                    <p className="date">{new Date(createdAt).toDateString()}</p>
                </div>

                <img className="cover-image" src={coverImage} alt="blog cover image" />

                <div className="blog-body">
                    <ReactMarkdown>
                        {body}
                    </ReactMarkdown>
                </div>

            </main>

        </article >
    )
}

export default ViewBlogPage