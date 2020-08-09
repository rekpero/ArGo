import React, { useContext } from "react";
import "./Landing.scss";
import { ActionContext } from "../../hooks";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";

function Landing() {
  const { toggleModal } = useContext(ActionContext);

  return (
    <div className="Landing">
      <div className="landing-container" id="home">
        <div className="header-section">
          <div className="header-bar">
            <div className="header-app-icon">
              <Link to="/">ArGo.</Link>
            </div>
            <div className="header-action-button-container">
              <div className="header-tabs">
                <AnchorLink href="#home">Home</AnchorLink>
              </div>
              {/* <div className="header-tabs">
                <AnchorLink href="#feature">Features</AnchorLink>
              </div> */}
              <div className="header-tabs">
                <AnchorLink href="#usage">Quickstart</AnchorLink>
              </div>
              <div className="header-tabs">
                <button
                  className="header-play-buttons"
                  onClick={(e) =>
                    toggleModal({
                      openModal: true,
                      modalConfig: { type: "sign-in" },
                    })
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section">
          <div className="home-placeholder">
            <div className="home-text-container">
              <div className="home-title-container">
                <h1 className="home-title">
                  Hosting site made permanent and simple
                </h1>
              </div>
              <div className="home-tagline">
                <span className="highlight">Permahosting</span> lets you host
                webapp <span className="highlight">permanently</span> and{" "}
                <span className="highlight">simply</span>. Built on the top of{" "}
                <span className="highlight">Arweave</span>, our product provide
                you <span className="highlight">easy to access hosting</span>{" "}
                and <span className="highlight">unlimited storage</span>.
              </div>
              <div className="get-started-container">
                <button
                  className="header-play-buttons"
                  onClick={(e) =>
                    toggleModal({
                      openModal: true,
                      modalConfig: { type: "sign-in" },
                    })
                  }
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="home-icon-container"></div>
          </div>
        </div>
      </div>
      <div className="content-section" id="usage">
        <div className="usage-section">
          <div className="usage-container">
            <h1>Deploy your Site to Arweave.</h1>
            <p>
              We provide <span className="highlight">Simple UI</span> to deploy
              your site to <span className="highlight">Arweave</span> with just
              one click.
              <br />
              Arweave provide permaweb, let you{" "}
              <span className="highlight">host your site permanently</span>.
            </p>
            <div className="usage-demo-container">
              <div>
                <h2>1. Enter your repository</h2>
              </div>
              <div>
                <h2>2. Add your build configurations</h2>
              </div>
              <div>
                <h2>3. Deploy your Site</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-app-section">
            <h1 className="footer-app-name">permahosting.</h1>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Quick Links</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arweave
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/technology#permaweb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Permaweb
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/get-involved/community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Community
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/mine/learn-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Navigations</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <AnchorLink href="#home" className="footer-link">
                  Home
                </AnchorLink>
              </li>
              {/* <li className="footer-link-item">
                <AnchorLink href="#feature" className="footer-link">
                  Feature
                </AnchorLink>
              </li> */}
              <li className="footer-link-item">
                <AnchorLink href="#usage" className="footer-link">
                  Quickstart
                </AnchorLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
