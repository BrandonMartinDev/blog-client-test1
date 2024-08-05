// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

import './editButton.css';
import { useLoggedInUser } from "@contexts/useLoggedInUser";


// -- == [[ COMPONENTS ]] == -- \\

type EditButtonProps = {
    blog_id: string;
    author_id: string;
}

const EditButton = ({ blog_id, author_id }: EditButtonProps) => {

    const user = useLoggedInUser();
    if (!user) return;
    if (user._id !== author_id) return;

    return (
        <div className="edit">
            <FaPencilAlt className="pencil" />
            <Link to={`/edit/blog/${blog_id}`}>Edit</Link>
        </div>
    )
}

export default EditButton