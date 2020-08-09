import React from "react";
import "./Header.scss";
import makeBlockie from "ethereum-blockies-base64";
import { ActionContext, StateContext } from "../../hooks";
import copy from "clipboard-copy";
import { shortenAddress } from "../../utils";
import { Clipboard, ExternalLink, Bell } from "react-feather";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../NavBar";

function Header() {
  const location = useLocation();
  const { signOut } = React.useContext(ActionContext);
  const { walletAddress, userName } = React.useContext(StateContext);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const logout = () => {
    signOut();
  };
  const copyWalletAddress = () => {
    copy(walletAddress);
  };
  const openArweaveIdLink = () => {
    window.open(
      "https://alz4bdsrvmoz.arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0",
      "_blank"
    );
  };
  return (
    <header className="Header">
      <div className="header-container">
        <div className="navbar-container">
          <div className="logo-container">
            <Link to="/">
              <h3 className="logo-name">ArGo.</h3>
            </Link>
          </div>
          <div className="user-profile-container">
            <div className="notification-container">
              <Bell />
            </div>
            <div onClick={(e) => setShowDropdown(!showDropdown)}>
              <img
                src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
                alt="address-blockie"
                className="user-profile-blockie-icon"
              />
            </div>
          </div>
          {showDropdown && (
            <div
              className="dropdown-overlay"
              onClick={(e) => setShowDropdown(false)}
            ></div>
          )}
          {showDropdown && (
            <div className="toolbar-dropdown-box">
              <div className="toolbar-dropdown-profile-icon-container">
                <img
                  src={makeBlockie(
                    "jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k"
                  )}
                  alt="address-blockie"
                  className="user-profile-blockie-icon"
                />
              </div>
              <div
                className="wallet-address-container"
                onClick={copyWalletAddress}
              >
                <div className="dropdown-title">{shortenAddress(userName)}</div>
                <div className="wallet-address-copy">
                  <Clipboard height={16} width={16} />
                </div>
              </div>
              <div
                className="wallet-address-container"
                onClick={openArweaveIdLink}
              >
                <div className="dropdown-title">Configure ArweaveId</div>
                <div className="wallet-address-copy">
                  <ExternalLink height={16} width={16} />
                </div>
              </div>
              <div className="dropdown-menu-button-container">
                <button
                  type="button"
                  onClick={logout}
                  className="dropdown-menu-button"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        {location.pathname !== "/site/start" && <NavBar />}
      </div>
    </header>
  );
}

export default Header;
