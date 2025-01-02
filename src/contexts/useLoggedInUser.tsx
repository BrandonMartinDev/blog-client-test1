// -- == [[ IMPORTS ]] == -- \\

import { type User } from "@custom-types/user-types";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import useGetUserInfo from "@hooks/useGetUserInfo";



// -- == [[ CONTEXT TYPES ]] == -- \\

type LoggedInUserContextValue = {
    user: User | false | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | false | undefined>>
}



// -- == [[ CREATE CONTEXTS ]] == -- \\

export const LoggedInUserContext = createContext<LoggedInUserContextValue | undefined>(undefined);



// -- == [[ CONTEXT METHODS ]] == -- \\

export const useLoggedInUserContext = () => {
    return useContext(LoggedInUserContext);
}

export const useLoggedInUser = () => {
    const contextValue = useContext(LoggedInUserContext);
    if (!contextValue) return;
    return contextValue.user;
}

export const useSetLoggedInUser = () => {
    const contextValue = useContext(LoggedInUserContext);
    if (!contextValue) return;
    return contextValue.setUser;
}



// -- == [[ CONTEXT PROVIDERS ]] == -- \\

export function LoggedInUserContextProvider({ children }: PropsWithChildren) {

    // Sets user state

    const [user, setUser] = useState<User | false | undefined>(undefined);

    const { userInfo, err } = useGetUserInfo("current");

    useEffect(() => {

        if (err) {
            setUser(undefined);
            throw new Error("There was an error getting the current user");
        }

        if (!userInfo) {
            setUser(false);
            return;
        }


        // If userInfo exists, sets logged in user

        setUser(userInfo);

    }, [userInfo]);

    // useEffect(() => {

    //     (async () => {

    //         if (!setUser) throw new Error("There was an error getting setUser");

    //         try {

    //             // Gets the current logged in user

    //             // const userInfo = await GetUserInfo("current");
    //             const { userInfo, err } = useGetUserInfo("current");

    //             if (err) {
    //                 setUser(undefined);
    //                 throw new Error("There was an error getting the current user");
    //             }

    //             if (!userInfo) {
    //                 setUser(false);
    //             }


    //             // If userInfo exists, sets logged in user

    //             setUser(userInfo);

    //         } catch (error) {

    //             setUser(false);

    //             if (error instanceof Error) {
    //                 console.warn(error.message);
    //                 return;
    //             }

    //             console.warn(error);

    //         }

    //     })();

    // }, [])

    return (
        <LoggedInUserContext.Provider value={{ user, setUser }}>
            {children}
        </LoggedInUserContext.Provider>
    )

}