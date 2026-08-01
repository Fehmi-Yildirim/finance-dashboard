import logo from "../../assets/logo.png";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <NavLink to="/" className="brand-link">
                <div className="brand-container">
                    <img
                        src={logo}
                        alt="FY Finance Dashboard Logo"
                        className="logo"
                    />
                    <span className="brand-text">
                        <strong className="brand-fy">FY</strong> Finance Dashboard
                    </span>
                </div>
            </NavLink>
        </header>
    );
}

export default Header;