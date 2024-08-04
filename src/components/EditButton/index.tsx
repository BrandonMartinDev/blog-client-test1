// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

import './editButton.css';


// -- == [[ COMPONENTS ]] == -- \\

type EditButtonProps = {
    id: string;
}

const EditButton = ({ id }: EditButtonProps) => {

    return (
        <div className="edit">
            <FaPencilAlt className="pencil" />
            <Link to={`/edit/blog/${id}`}>Edit</Link>
        </div>
    )
}

export default EditButton