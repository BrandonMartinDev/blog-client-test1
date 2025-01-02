import { useNavigate } from 'react-router-dom';

import './loginPage.css';

import { useLoggedInUser } from "@contexts/useLoggedInUser";

import LoginForm from './components/LoginForm';
import { useEffect } from 'react';

const LoginPage = () => {

    const navigate = useNavigate();
    const user = useLoggedInUser();

    useEffect(() => {

        if (user) {

            console.warn("User is already logged in, redirecting to home page");
            navigate("/");

            return;

        }

    }, [user])

    return (
        <main className="container">

            <div className="login">

                <div className="login-image">
                    <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" alt="login form image" />
                </div>

                <LoginForm />

            </div>

        </main>
    )
}

export default LoginPage