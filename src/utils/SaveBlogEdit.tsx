// -- == [[ IMPORTS ]] == -- \\

import { API_URL } from "@config/defaults";



// -- == [[ DEFAULTS ]] == -- \\

const ENDPOINT_URL = (`${API_URL}/blog/`);



// -- == [[ UTILS METHODS ]] == -- \\

export default async function SaveBlogEdit(blog_id: string, title: string, coverImage: string, body: string) {

    if (!blog_id) throw new Error("'blog_id' was not provided!");
    if (!title) throw new Error("'title' was not provided!");
    if (!coverImage) throw new Error("'coverImage' was not provided!");
    if (!body) throw new Error("'body' was not provided!");

    // Calls login api endpoint with username and password

    const reqBody = {
        title: title,
        coverImage: coverImage,
        body: body
    }

    const response = await fetch(`${ENDPOINT_URL}/${blog_id}`, {

        credentials: "include",
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)

    });


    // Parses server response

    const parsedResponse = await response.json();
    if (!parsedResponse || !("message" in parsedResponse)) throw new Error("There was an error getting the data");

    console.log(parsedResponse.message);

}