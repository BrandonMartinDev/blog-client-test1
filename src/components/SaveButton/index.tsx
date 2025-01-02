// -- == [[ IMPORTS ]] == -- \\

import { IoIosSave } from "react-icons/io";

import './saveButton.css';


// -- == [[ COMPONENTS ]] == -- \\

type SaveButtonProps = {
    handleClick: () => any;
}

const SaveButton = ({ handleClick }: SaveButtonProps) => {
    return (
        <div className="save" onClick={handleClick}>
            <IoIosSave className="harddisk" />
            <p>Save</p>
        </div>
    )
}

export default SaveButton