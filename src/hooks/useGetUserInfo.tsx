import { useEffect, useState } from "react";

import { API_URL } from "@config/defaults";
import { type User } from "@custom-types/user-types";

const ENDPOINT: string = `${API_URL}/user/`;



export default function useGetUserInfo(user_id: string) {

    if (!user_id) throw new Error("'user_id' was not provided!");


    // Sets up userInfo state

    const [userInfo, setUserInfo] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [err, setErr] = useState<unknown>();


    // Creates useEffect that depends on user_id

    useEffect(() => {

        (async () => {

            setIsLoading(true);

            try {

                const response = await fetch(`${ENDPOINT}${user_id}`, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: "include"
                });
                
                const parsedResponse = await response.json();
                if (!parsedResponse || !("data" in parsedResponse) || !("message" in parsedResponse)) throw new Error("There was an error getting the data");

                setUserInfo(parsedResponse.data);

                console.log(parsedResponse.message, parsedResponse.data);

            } catch (err) {
                setErr(err);
            }

            setIsLoading(false);

        })();

    }, [user_id]);


    // Returns userInfo

    return {
        userInfo,
        isLoading,
        err
    };

}