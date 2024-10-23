import { API_URL } from "@config/defaults";
import { type User } from "@custom-types/user-types";

const ENDPOINT: string = `${API_URL}/user/`;



export default async function GetUserInfo(user_id: string): Promise<User> {

    console.warn("DEPRECATED, USE 'useGetUserInfo' HOOK");

    if (!user_id) throw new Error("'user_id' was not provided!");


    // Calls api endpoint for getting user info

    const response = await fetch(`${ENDPOINT}${user_id}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    });


    // Parses server response and returns data

    const parsedResponse = await response.json();

    if ("error" in parsedResponse) throw new Error(parsedResponse.error);
    if (!parsedResponse || !("data" in parsedResponse)) throw new Error("There was an error getting the data");

    console.log(parsedResponse.message);

    return parsedResponse.data;

}