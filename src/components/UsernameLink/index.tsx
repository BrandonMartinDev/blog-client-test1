// -- == [[ IMPORTS ]] == -- \\

import { Link } from "react-router-dom";

import './usernameLink.css';



// -- == [[ COMPONENTS ]] == -- \\

type UsernameLinkProps = {
    displayName: string;
    userId: string;
}

const UsernameLink = ({ displayName, userId }: UsernameLinkProps) => {
    return <Link className="username-link" to={`/view/user/${userId}`}>{displayName}</Link>;
}

export default UsernameLink