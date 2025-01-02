import { useEffect, useState } from "react";

import { API_URL } from "@config/defaults";
import { type Article } from "@custom-types/blog-types";

const ENDPOINT: string = `${API_URL}/blog/`;



export default function useGetBlogInfo(blog_id: string) {

    if (!blog_id) throw new Error("'blog_id' was not provided!");


    // Sets up blogInfo state

    const [blogInfo, setBlogInfo] = useState<Article>();
    const [err, setErr] = useState<unknown>();


    // Creates useEffect that depends on blog_id

    useEffect(() => {

        (async () => {

            try {

                const response = await fetch(`${ENDPOINT}${blog_id}`, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: "include"
                });

                const parsedResponse = await response.json();
                if (!parsedResponse || !("data" in parsedResponse) || !("message" in parsedResponse)) throw new Error("There was an error getting the data");

                setBlogInfo(parsedResponse.data);

                // console.log(parsedResponse.message, parsedResponse.data);
                console.log(`Successfully retrived blog '${blog_id}' info`)

            } catch (err) {
                setErr(err);
            }

        })();

    }, [blog_id]);


    // Returns blogInfo

    return {
        blogInfo,
        err
    };

}