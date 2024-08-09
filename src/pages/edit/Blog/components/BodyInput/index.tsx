// -- == [[ IMPORTS ]] == -- \\

import TextareaAutosize from 'react-textarea-autosize';

import { EditAction } from '../..'; // Yes, I cringed too.. Sorry 😭



// -- == [[ COMPONENTS ]] == -- \\

type BodyInputProps = {

    inputRef: React.RefObject<HTMLTextAreaElement>;
    body: string;
    editDispatch: React.Dispatch<EditAction>;

}

const BodyInput = ({ inputRef, body, editDispatch }: BodyInputProps) => {
    return (
        <TextareaAutosize

            ref={inputRef}

            name="body-input"
            className="body-input"
            id="body-input"
            maxLength={25000}
            minLength={5}
            value={body}
            onBlur={() => {
                editDispatch({ type: "STOP_EDIT", payload: "" });
            }}
            onChange={(e) => {
                editDispatch({ type: "BODY", payload: e.target.value });
            }}

        />
    )
}

export default BodyInput