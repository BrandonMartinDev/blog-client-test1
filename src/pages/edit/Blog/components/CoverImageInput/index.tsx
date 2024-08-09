// -- == [[ IMPORTS ]] == -- \\

import TextareaAutosize from 'react-textarea-autosize';

import { EditAction } from '../..'; // Yes, I cringed too.. Sorry 😭



// -- == [[ COMPONENTS ]] == -- \\

type CoverImageInputProps = {

    inputRef: React.RefObject<HTMLTextAreaElement>;
    coverImage: string;
    editDispatch: React.Dispatch<EditAction>;

}

const CoverImageInput = ({ inputRef, coverImage, editDispatch }: CoverImageInputProps) => {
    return (
        <TextareaAutosize

            ref={inputRef}

            name="cover-image-input"
            className="cover-image-input"
            id="cover-image-input"
            maxLength={1000}
            minLength={3}
            value={coverImage}
            onBlur={() => {
                editDispatch({ type: "STOP_EDIT", payload: "" });
            }}
            onChange={(e) => {
                editDispatch({ type: "COVER_IMAGE", payload: e.target.value });
            }}

        />
    )
}

export default CoverImageInput