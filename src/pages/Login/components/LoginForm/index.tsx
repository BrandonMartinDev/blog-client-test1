import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './loginForm.css';

import Logo from '/Logo.png';

import { useSetLoggedInUser } from '@contexts/useLoggedInUser';

import GetUserInfo from '@utils/GetUserInfo';

import LoginUser from '@utils/LoginUser';



const LoginForm = () => {

    const navigate = useNavigate();

    // Gets setUser from useSetLoggedInUser context

    const setUser = useSetLoggedInUser();
    if (!setUser) throw new Error("There was an error getting setUser");

    const [username, setUsername] = useState<string>("");
    const [validUser, setValidUser] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [validPassword, setValidPassword] = useState<boolean>(false);

    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [error, setError] = useState<string | false>(false);


    useEffect(() => {

        const usernameRegEx = new RegExp(/^[A-Za-z]{1}\w{1,21}[A-Za-z0-9]{1}$/, "g");
        const validUser = usernameRegEx.test(username);

        setValidUser(validUser);
        setError(false);

    }, [username]);

    useEffect(() => {

        const passwordRegEx = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,150}$/, "g");
        const validPass = passwordRegEx.test(password);

        setValidPassword(validPass);
        setError(false);

    }, [password]);

    async function OnSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!validUser || !validPassword) return;

        setLoggingIn(true);

        setUsername("");
        setPassword("");

        try {

            // Logs in user

            await LoginUser(username, password);


            // Gets the current logged in user

            const userInfo = await GetUserInfo("current");
            if (!userInfo) throw new Error("There was an error logging in");


            // If userInfo exists, sets logged in user

            if (!setUser) throw new Error("There was an error getting setUser");
            setUser(userInfo);

            navigate('/');

        } catch (err) {

            if (err instanceof Error) {
                console.warn(err.message);
                setError(err.message);
            } else {
                console.warn(err);
                setError(err as string);
            }

        }

        setLoggingIn(false);

    }

    async function LoginDemoUser() {

        try {

            // Logs in user

            // Absolutely HORRIBLE storing credentials in plaintext, I know
            await LoginUser("Demo_User", "Passw0rd!"); 


            // Gets the current logged in user

            const userInfo = await GetUserInfo("current");
            if (!userInfo) throw new Error("There was an error logging in");


            // If userInfo exists, sets logged in user

            if (!setUser) throw new Error("There was an error getting setUser");
            setUser(userInfo);

            navigate('/');

        } catch (err) {

            if (err instanceof Error) {
                console.warn(err.message);
                setError(err.message);
            } else {
                console.warn(err);
                setError(err as string);
            }

        }

    }

    return (
        <div className="login-form-container">

            <div className="logo">
                <Link to='/' className='logo-link'>
                    <img src={Logo} alt="blog logo" />
                </Link>
            </div>

            <h2 className='title'>Welcome</h2>
            <p className='subtitle'>Login to start commenting and liking blogs!</p>

            {loggingIn ? (

                <div className="text-center logging-in-loading">
                    <p>Attempting to log in...</p>
                    <p className='text-center subtitle'>Please wait :)</p>
                </div>

            ) : (
                <form className='login-form' onSubmit={OnSubmit}>

                    {error && <p className='subtitle text-center login-error'>Username or password is incorrect.</p>}

                    <fieldset>
                        {/* <label htmlFor="username-input">Username</label>
                    <br /> */}
                        <input
                            type="text"
                            id='username-input'
                            name='username-input'
                            placeholder='Username'
                            value={username}
                            required

                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}

                        />
                    </fieldset>

                    <fieldset>

                        {/* <label htmlFor="password-input">Password</label>
                    <br /> */}
                        <input
                            type="password"
                            id='password-input'
                            name='password-input'
                            placeholder='Password'
                            value={password}
                            required

                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}

                        />

                    </fieldset>

                    {/*There is no email system, so the forgot-password button is just for show*/}

                    <div className="forgot-password">
                        <Link to="" className='subtitle'>Forgot Password?</Link>
                    </div>

                    <button type="submit" disabled={!validUser || !validPassword}>Login</button>

                </form>
            )}

            <p className='subtitle text-center signup'>Don't have an account? <Link to='/sign-up'>Sign up</Link></p>

            <p className='subtitle text-center demo'>
                Want to a demo? <Link to='' onClick={LoginDemoUser}>Try Demo</Link>
            </p>

        </div>
    )
}

export default LoginForm