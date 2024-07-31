import { Link, Outlet } from "react-router-dom"

import './navbar.css';

import Logo from "/Logo.png"

const Navbar = () => {
  return (
    <>

      <header>

        <div className="navbar container">

          <Link to='/'>
            <img className="header-navbar_logo" src={Logo} alt="logo" />
          </Link>

          <nav className="header-nav">

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

        </div>

      </header>

      <Outlet />

    </>
  )
}

export default Navbar