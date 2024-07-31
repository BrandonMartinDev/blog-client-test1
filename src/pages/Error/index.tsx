import { useLocation, Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

import './error.css';

const ErrorPage = () => {

    const { pathname } = useLocation();

    return (
        <main className="error-page container">

            <FiAlertTriangle className="error-page-img" />

            <div className="main-text">
                <h1>404</h1>
                <h2>Oopsies!</h2>
            </div>

            <p className="subtext">Unfortunately, the page <span>'{pathname}'</span> could not be found!</p>

            <nav className="error-nav">

                <ul>

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/popular">Popular</Link>
                    </li>

                    <li>
                        <a target="_blank" href="">Portfolio</a>
                    </li>

                    <li>
                        <a target="_blank" href="https://github.com/BrandonMartinDev/blog-client-test1">Blog Github</a>
                    </li>

                </ul>

            </nav>

        </main>
    )
}

export default ErrorPage