// -- == [[ IMPORTS ]] == -- \\

import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import './viewBlog.css';

import useGetBlogInfo from "@hooks/useGetBlogInfo";

import UsernameLink from "@global-components/UsernameLink";
import Likes from "@global-components/Likes";
import EditButton from "@global-components/EditButton";



// -- == [[ COMPONENTS ]] == -- \\

type BlogPageErrorProps = {
    blog_id?: string;
}

const ViewBlogPageError = ({ blog_id }: BlogPageErrorProps) => {
    return (
        <div className="container">
            {
                blog_id
                    ? <h1 className="error">There was an error loading blog {blog_id}</h1>
                    : <h1 className="error">There was an error loading blog</h1>
            }
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

    // Gets blog_id from url params

    const { blog_id } = useParams();
    if (!blog_id) return <ViewBlogPageError />;


    // Gets blogInfo from blog_id

    const { blogInfo, err } = useGetBlogInfo(blog_id);

    if (err) {
        console.warn(`ERROR LOADING BLOG: `, err);
        return <ViewBlogPageError blog_id={blog_id} />;
    }

    if (!blogInfo) return <ViewBlogPageLoading />;


    // Destructures blogInfo

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

                <div className="blog-header">
                    <UsernameLink displayName={author.displayName} userId={author._id} />
                    <EditButton blog_id={_id} author_id={author._id} />
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