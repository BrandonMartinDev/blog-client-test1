// -- == [[ IMPORTS ]] == -- \\

import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import './editBlog.css';

import { useLoggedInUser } from "@contexts/useLoggedInUser";

import useGetBlogInfo from "@hooks/useGetBlogInfo";

import { UsernameLink, Likes, SaveButton, CancelButton } from "@global-components/exportGlobalComponents";

import SaveBlogEdit from "@utils/SaveBlogEdit";

import TitleInput from "./components/TitleInput";
import CoverImageInput from "./components/CoverImageInput";
import BodyInput from "./components/BodyInput";



// -- == [[ EDIT REDUCER TYPES ]] == -- \\

export type EditState = {

    title: string;
    editingTitle: boolean;

    coverImage: string;
    editingCoverImage: boolean;

    body: string;
    editingBody: boolean

}

export type EDIT_ACTION_TYPE = "ALL"
    | "TITLE"
    | "COVER_IMAGE"
    | "BODY"
    | "STOP_EDIT";

export type EditAction = {
    type: EDIT_ACTION_TYPE;
    payload: string;
    newState?: EditState;
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

const EditBlogPage = () => {

    const navigate = useNavigate();

    // Sets up useRefs

    const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
    const titleInputRef = useRef<HTMLTextAreaElement>(null);
    const coverImageInputRef = useRef<HTMLTextAreaElement>(null);
    const bodyInputRef = useRef<HTMLTextAreaElement>(null);


    // Sets up edit state

    const EditInitialState: EditState = {

        title: "",
        editingTitle: false,

        coverImage: "",
        editingCoverImage: false,

        body: "",
        editingBody: false

    }


    // Sets up edit reducer

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

                setShowSaveButton(true);

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


        // Checks if the logged in user id matches the blog's author id
        // If not, navigate to view blog page

        if (user === false || user._id !== blogInfo.author._id) {
            console.log("USER IS UNAUTHORIZED");
            navigate(`/unauthorized`);
            return;
        };


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

    }, [user, blogInfo]);


    // Initializes useEffect that depends on refs

    useEffect(() => {

        if (editState.editingTitle) {
            titleInputRef.current?.focus();
            return;
        }

        if (editState.editingCoverImage) {
            coverImageInputRef.current?.select();
            return;
        }

        if (editState.editingBody) {
            bodyInputRef.current?.focus();
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


    // Initialize click handlers

    const handleCancelEditClick = async () => {
        navigate(`/view/blog/${blog_id}`);
    }

    const handleSaveEditClick = async () => {

        if (showSaveButton !== true) return;
        if (!editState.title || !editState.coverImage || !editState.body) return;

        setShowSaveButton(false);

        await SaveBlogEdit(blog_id, editState.title, editState.coverImage, editState.body);

        navigate(`/view/blog/${blog_id}`);

    }


    // Renders EditBlogPage

    return (
        <article className="container">

            <main className="edit-blog_main">

                {
                    editState.editingTitle
                        ? <TitleInput inputRef={titleInputRef} title={editState.title} editDispatch={editDispatch} />
                        : (
                            <h1
                                className="blog-title"
                                onClick={() => {
                                    editDispatch({ type: "TITLE", payload: editState.title });
                                }}
                            >{editState.title}</h1>
                        )
                }

                <div className="blog-header">

                    <UsernameLink displayName={author.displayName} userId={author._id} />

                    <div className="buttons">

                        {
                            // Only show save button if blog was edited
                            showSaveButton && <SaveButton handleClick={handleSaveEditClick} />
                        }

                        <CancelButton handleClick={handleCancelEditClick} />
                        <Likes amountOfLikes={likedBy.length} />
                    </div>

                    <p className="date">{new Date(createdAt).toDateString()}</p>

                </div>

                <div className="cover-image-holder">
                    {
                        editState.editingCoverImage
                            ? (
                                <>
                                    <CoverImageInput inputRef={coverImageInputRef} coverImage={editState.coverImage} editDispatch={editDispatch} />
                                    <img className="cover-image-input-img" src={editState.coverImage} alt="blog cover image" />
                                </>
                            )
                            : (
                                <img

                                    className="cover-image-img"
                                    src={editState.coverImage}
                                    alt="blog cover image"

                                    onClick={() => {
                                        editDispatch({ type: "COVER_IMAGE", payload: editState.coverImage });
                                    }}

                                />
                            )
                    }
                </div>

                <div

                    className="blog-body"

                    onClick={() => {
                        editDispatch({ type: "BODY", payload: editState.body });
                    }}
                >

                    {
                        editState.editingBody
                            ? (
                                <BodyInput inputRef={bodyInputRef} body={editState.body} editDispatch={editDispatch} />
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

export default EditBlogPage