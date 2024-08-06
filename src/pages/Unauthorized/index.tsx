import { Link } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";;

import './unauthorized.css';

const UnauthorizedPage = () => {

    return (
        <main className="error-page container">

            <FaUserLock className="error-page-img" />

            <div className="main-text">
                <h1>401</h1>
                <h2>Unauthorized!</h2>
            </div>

            <p className="subtext">Unfortunately, you lack the proper credentials to access this page!</p>

            <nav className="error-nav">

                <ul>

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/featured">Featured</Link>
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

export default UnauthorizedPage