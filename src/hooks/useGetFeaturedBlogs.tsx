import { useEffect, useState } from "react";

import { API_URL } from "@config/defaults";
import { type Article } from "@custom-types/blog-types";

const ENDPOINT: string = `${API_URL}/blog/featured`;



export default function useGetFeaturedBlogs() {


    // Sets up userInfo state

    const [featuredBlogs, setFeaturedBlogs] = useState<Article[]>();
    const [err, setErr] = useState<unknown>();


    // Creates useEffect that depends on first render

    useEffect(() => {

        (async () => {

            try {

                const response = await fetch(ENDPOINT);
                const parsedResponse = await response.json();
                if (!parsedResponse || !("data" in parsedResponse) || !("message" in parsedResponse)) throw new Error("There was an error getting the data");

                setFeaturedBlogs(parsedResponse.data);

            } catch (err) {
                setErr(err);
            }

        })();

    }, []);


    // Returns featuredBlogs

    return {
        featuredBlogs,
        err
    };

}