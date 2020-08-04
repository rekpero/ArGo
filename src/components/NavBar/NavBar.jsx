import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar">
      <div className="navigation-container">
        <div className="navbar-container">
          <ul className="nav">
            <li className="nav-item">
              <Link>Sites</Link>
            </li>
            <li className="nav-item">
              <Link>Builds</Link>
            </li>
            <li className="nav-item">
              <Link>Billing</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
