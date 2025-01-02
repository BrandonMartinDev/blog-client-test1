// -- == [[ IMPORTS ]] == -- \\

import { MdError } from "react-icons/md";

import './largeError.css';



type LargeErrorProps = {

    mainText?: string;
    subText?: string;

}

const LargeError = ({
    mainText,
    subText
}: LargeErrorProps) => {
    return (
        <div className="large-error container">

            <MdError className="big-gray-img" />

            <div className="main-text">
                <h1>{mainText || "An error occurred"}</h1>
                <h2>{subText}</h2>
            </div>

        </div>
    )
}

export default LargeError