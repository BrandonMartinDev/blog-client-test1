// -- == [[ IMPORTS ]] == -- \\

import TextareaAutosize from 'react-textarea-autosize';

import { EditAction } from '../..'; // Yes, I cringed too.. Sorry 😭



// -- == [[ COMPONENTS ]] == -- \\

type TitleInputProps = {

    inputRef: React.RefObject<HTMLTextAreaElement>;
    title: string;
    editDispatch: React.Dispatch<EditAction>;

}

const TitleInput = ({ inputRef, title, editDispatch }: TitleInputProps) => {
    return (
        <TextareaAutosize
        
            ref={inputRef}
            
            name="title-input"
            className="title-input"
            id="title-input"
            maxLength={100}
            minLength={3}
            value={title}
            onBlur={() => {
                editDispatch({ type: "STOP_EDIT", payload: "" });
            }}
            onChange={(e) => {
                editDispatch({ type: "TITLE", payload: e.target.value });
            }}

        />
    )
}

export default TitleInput