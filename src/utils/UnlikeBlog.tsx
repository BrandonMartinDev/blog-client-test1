// -- == [[ IMPORTS ]] == -- \\

import { API_URL } from "@config/defaults";



// -- == [[ DEFAULTS ]] == -- \\

const ENDPOINT_URL = (`${API_URL}/user/current/likes`);



// -- == [[ UTILS METHODS ]] == -- \\

export default async function UnlikeBlog(blog_id: string) {

    // Calls likes api endpoint with blog_id provided

    const body = { blog_id: blog_id };

    const response = await fetch(ENDPOINT_URL, {

        credentials: "include",
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)

    });


    // Parses server response

    const parsedResponse = await response.json();
    if (!parsedResponse || !("message" in parsedResponse)) throw new Error("There was an error getting the data");

    console.log(parsedResponse.message);

}