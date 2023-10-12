import { Link } from "react-router-dom";
import './Header.css'

const Header = (props) => {
  const { token, setToken } = props;

  const logOut = () => {
    setToken('');
  };

  return (
    <header>
      <nav className="navbar">
        <h1>Movie Meter</h1>
        <ul className="nav-links">
          {!token ? (
            <>
              <li>
                <Link to="/signin">SignIn</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin" onClick={logOut}>LogOut</Link>
            </li>
          )}
          <li>
            <Link to="/">DashBoard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
