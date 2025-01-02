// -- == [[ IMPORTS ]] == -- \\

import { MdCancel } from "react-icons/md";

import './cancelButton.css';


// -- == [[ COMPONENTS ]] == -- \\

type CancelButtonProps = {
    handleClick: () => any;
}

const CancelButton = ({ handleClick }: CancelButtonProps) => {
    return (
        <div className="cancel" onClick={handleClick}>
            <MdCancel className="nosign" />
            <p>Cancel</p>
        </div>
    )
}

export default CancelButton