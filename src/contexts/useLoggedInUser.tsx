// -- == [[ IMPORTS ]] == -- \\

import { type User } from "@custom-types/user-types";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import GetUserInfo from "@utils/GetUserInfo";



// -- == [[ CONTEXT TYPES ]] == -- \\

type LoggedInUserContextValue = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}



// -- == [[ CREATE CONTEXTS ]] == -- \\

export const LoggedInUserContext = createContext<LoggedInUserContextValue | undefined>(undefined);



// -- == [[ CONTEXT METHODS ]] == -- \\

export const useLoggedInUserContext = () => {
    return useContext(LoggedInUserContext);
}

export const useLoggedInUser = () => {
    const contextReturn = useContext(LoggedInUserContext);
    if (!contextReturn) return;
    return contextReturn.user;
}

export const useSetLoggedInUser = () => {
    const contextReturn = useContext(LoggedInUserContext);
    if (!contextReturn) return;
    return contextReturn.setUser;
}



// -- == [[ CONTEXT PROVIDERS ]] == -- \\

export function LoggedInUserContextProvider({ children }: PropsWithChildren) {

    // Sets user state

    const [user, setUser] = useState<User>();

    useEffect(() => {

        (async () => {

            try {

                // Gets the current logged in user

                const userInfo = await GetUserInfo("current");
                if (!userInfo) throw new Error("There was an error logging in");


                // If userInfo exists, sets logged in user

                if (!setUser) throw new Error("There was an error getting setUser");
                setUser(userInfo);

            } catch (error) {

                if (error instanceof Error) {
                    console.warn(error.message);
                    return;
                }

                console.warn(error);

            }

        })();

    }, [])

    return (
        <LoggedInUserContext.Provider value={{ user, setUser }}>
            {children}
        </LoggedInUserContext.Provider>
    )

}