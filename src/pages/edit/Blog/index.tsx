// -- == [[ IMPORTS ]] == -- \\

import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

import './editBlog.css';

import { useLoggedInUser } from "@contexts/useLoggedInUser";

import useGetBlogInfo from "@hooks/useGetBlogInfo";

import { UsernameLink, Likes } from "@global-components/exportGlobalComponents";



// -- == [[ EDIT REDUCER INFO ]] == -- \\

type EditState = {

    title: string;
    editingTitle: boolean;

    coverImage: string;
    editingCoverImage: boolean;

    body: string;
    editingBody: boolean

}

type EDIT_ACTION_TYPE = "ALL"
    | "TITLE"
    | "COVER_IMAGE"
    | "BODY"
    | "STOP_EDIT";

type EditAction = {
    type: EDIT_ACTION_TYPE;
    payload: string;
    newState?: EditState;
}

const EditReducer = (prevState: EditState, action: EditAction): EditState => {

    switch (action.type) {

        case "ALL":
            if (!action.newState) throw new Error("newState was not provided!");
            return action.newState;
        case "TITLE":
            return { ...prevState, title: action.payload, editingTitle: true };
        case "COVER_IMAGE":
            return { ...prevState, coverImage: action.payload, editingCoverImage: true };
        case "BODY":
            return { ...prevState, body: action.payload, editingBody: true };
        case "STOP_EDIT":
            return {
                ...prevState,
                editingTitle: false,
                editingCoverImage: false,
                editingBody: false,
            }
        default:
            throw new Error(`${action.type} was not a valid action type!`);

    }

}



// -- == [[ COMPONENTS ]] == -- \\

const EditBlogPageError = () => {
    return (
        <div className="container">
            <h1>There was an error loading blog</h1>
        </div>
    )
}

const EditBlogPageLoading = () => {
    return (
        <div className="container">
            <h1>Loading blog...</h1>
        </div>
    )
}

const ViewBlogPage = () => {

    const navigate = useNavigate();

    // Sets up useRefs

    const titleInputUseRef = useRef<HTMLTextAreaElement>(null);
    const coverImageInputUseRef = useRef();
    const bodyInputUseRef = useRef<HTMLTextAreaElement>(null);


    // Sets up edit state

    const EditInitialState: EditState = {

        title: "",
        editingTitle: false,

        coverImage: "",
        editingCoverImage: false,

        body: "",
        editingBody: false

    }

    // Initialize useReducer

    const [editState, editDispatch] = useReducer(EditReducer, EditInitialState);


    // Gets blog_id from url params

    const { blog_id } = useParams();
    if (!blog_id) return <EditBlogPageError />;


    // Gets blogInfo from blog_id

    const { blogInfo, err } = useGetBlogInfo(blog_id);


    // Gets current logged in user

    const user = useLoggedInUser();


    // Initializes useEffect that depends on user and blogInfo

    useEffect(() => {

        // Checks if user and blogInfo exist

        if (user === undefined || blogInfo === undefined) return;


        // Sets EditReducer state to blog info

        editDispatch({
            type: "ALL",
            payload: "",
            newState: {

                title: blogInfo.title || "",
                editingTitle: false,

                coverImage: blogInfo.coverImage || "",
                editingCoverImage: false,

                body: blogInfo.body || "",
                editingBody: false

            }
        });


        // Checks if the logged in user id matches the blog's author id
        // If not, navigate to view blog page

        if (user === false || user._id !== blogInfo.author._id) {
            console.log("USER IS UNAUTHORIZED");
            navigate(`/unauthorized`);
            return;
        };

    }, [user, blogInfo]);


    // Initializes useEffect that depends on refs

    useEffect(() => {

        if (editState.editingTitle) {
            titleInputUseRef.current?.focus();
            return;
        }

        if (editState.editingBody) {      
            bodyInputUseRef.current?.focus();
            return;
        }

    }, [editState]);


    // Checks if there was an error getting blog info

    if (err) {
        console.warn("ERROR LOADING BLOG: ", err);
        return <EditBlogPageError />;
    }


    // Check if user and blogInfo exist
    // If one or the other doesn't exist, render loading page

    if (user === undefined || blogInfo === undefined) return <EditBlogPageLoading />;


    // Destructures blogInfo

    const {

        author,
        createdAt,
        likedBy,

    } = blogInfo;


    // Renders EditBlogPage

    return (
        <article className="container">

            <main className="edit-blog_main">

                {
                    editState.editingTitle
                        ? (
                            <TextareaAutosize

                                ref={titleInputUseRef}

                                name="title-input"
                                className="title-input"
                                id="title-input"
                                maxLength={100}
                                minLength={3}
                                value={editState.title}
                                onBlur={() => {
                                    editDispatch({ type: "STOP_EDIT", payload: "" });
                                }}
                                onChange={(e) => {
                                    editDispatch({ type: "TITLE", payload: e.target.value });
                                }}

                            />
                        ) : (
                            <h1
                                className="title-input"
                                onClick={() => {
                                    editDispatch({ type: "TITLE", payload: editState.title });
                                }}
                            >{editState.title}</h1>
                        )
                }

                <div className="blog-header">
                    <UsernameLink displayName={author.displayName} userId={author._id} />
                    <Likes amountOfLikes={likedBy.length} />
                    <p className="date">{new Date(createdAt).toDateString()}</p>
                </div>

                <img className="cover-image" src={editState.coverImage} alt="blog cover image" />

                <div

                    className="blog-body"

                    onClick={() => {
                        editDispatch({ type: "BODY", payload: editState.body });
                    }}
                >

                    {
                        editState.editingBody
                            ? (
                                <TextareaAutosize

                                    ref={bodyInputUseRef}

                                    name="body-input"
                                    className="body-input"
                                    id="body-input"
                                    maxLength={25000}
                                    minLength={5}
                                    value={editState.body}
                                    onBlur={() => {
                                        editDispatch({ type: "STOP_EDIT", payload: "" });
                                    }}
                                    onChange={(e) => {
                                        editDispatch({ type: "BODY", payload: e.target.value });
                                    }}

                                />
                            ) : (
                                <ReactMarkdown>
                                    {editState.body}
                                </ReactMarkdown>
                            )
                    }

                </div>


            </main>

        </article >
    )
}

export default ViewBlogPage