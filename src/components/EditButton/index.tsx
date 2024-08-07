// -- == [[ IMPORTS ]] == -- \\

import { FaPencilAlt } from "react-icons/fa";

import './editButton.css';


// -- == [[ COMPONENTS ]] == -- \\

type EditButtonProps = {
    handleClick: () => any;
}

const EditButton = ({ handleClick }: EditButtonProps) => {
    return (
        <div className="edit" onClick={handleClick}>
            <FaPencilAlt className="pencil" />
            <p>Edit</p>
        </div>
    )
}

export default EditButton