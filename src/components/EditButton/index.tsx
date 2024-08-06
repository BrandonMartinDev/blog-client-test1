// -- == [[ IMPORTS ]] == -- \\

import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

import './editButton.css';
import { useLoggedInUser } from "@contexts/useLoggedInUser";


// -- == [[ COMPONENTS ]] == -- \\

type EditButtonProps = {
    blog_id: string;
    author_id: string;
}

const EditButton = ({ blog_id, author_id }: EditButtonProps) => {

    const navigate = useNavigate();

    const user = useLoggedInUser();
    if (!user) return;
    if (user._id !== author_id) return;

    const handleClick = () => {
        navigate(`/edit/blog/${blog_id}`);
    }

    return (
        <div className="edit" onClick={handleClick}>
            <FaPencilAlt className="pencil" />
            <p>Edit</p>
        </div>
    )
}

export default EditButton