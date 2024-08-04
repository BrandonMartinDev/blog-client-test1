// -- == [[ IMPORTS ]] == -- \\

import { API_URL } from "@config/defaults";



// -- == [[ DEFAULTS ]] == -- \\

const ENDPOINT_URL = (`${API_URL}/login`);



// -- == [[ UTILS METHODS ]] == -- \\

export default async function LoginUser(username: string, password: string) {
    
    // Calls login api endpoint with username and password

    const body = { username, password };

    const response = await fetch(ENDPOINT_URL, {

        credentials: "include",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)

    });


    // Parses server response

    const parsedResponse = await response.json();

    if ("error" in parsedResponse) throw new Error(parsedResponse.error);
    if (!parsedResponse) throw new Error("There was an error getting the data");

    console.log(`Logged in as ${username}`);

}