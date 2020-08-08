/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "./DeploySite.scss";
import { Info } from "react-feather";
import { StateContext, ActionContext } from "../../hooks";
import { APIService } from "../../services";
import socketIOClient from "socket.io-client";
import moment from "moment";
import { animateScroll } from "react-scroll";

const ENDPOINT = "http://localhost:5000";

function DeploySite() {
  const { setCurrentSiteDeployLogs } = useContext(ActionContext);
  const {
    currentSiteDeployConfig,
    currentSiteDeployLogs,
    walletAddress,
  } = useContext(StateContext);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployedLink, setDeployedLink] = useState("");

  useEffect(() => {
    if (currentSiteDeployConfig) {
      console.log(currentSiteDeployConfig);
      APIService.startDeploy({
        url: currentSiteDeployConfig.repositoryLink,
        topic: currentSiteDeployConfig.id,
        branch: currentSiteDeployConfig.repositoryBranch,
        packageManager: currentSiteDeployConfig.packageManager,
        buildCommand: currentSiteDeployConfig.buildCommand,
        buildDirectory: currentSiteDeployConfig.publishDir,
        userAddress: walletAddress,
      }).then((data) => {
        console.log(data);
        if (data.deployed) {
          setIsDeployed(data.deployed);
          const arweaveLinkFilter = currentSiteDeployLogs.filter(
            (deployLog) => deployLog.log.indexOf("https://arweave.net/") !== -1
          );
          const arweaveLink =
            arweaveLinkFilter.length === 1
              ? arweaveLinkFilter[0].log.trim()
              : "";

          setDeployedLink(arweaveLink);
        }
      });
      const socket = socketIOClient(ENDPOINT);
      socket.on(currentSiteDeployConfig.id, (data) => {
        // console.log(data);
        data.split("\n").forEach((line) => {
          if (line.trim()) {
            currentSiteDeployLogs.push({
              log: line,
              time: moment().format("hh:mm:ss A MM-DD-YYYY"),
            });
          }
        });
        setCurrentSiteDeployLogs(currentSiteDeployLogs);
        scrollToWithContainer(currentSiteDeployLogs.length - 1);
      });
      // CLEAN UP THE EFFECT
      return () => socket.disconnect();
    }
  }, []);

  let displayGithubRepo = "";
  let githubBranchLink = "";
  if (currentSiteDeployConfig) {
    displayGithubRepo = currentSiteDeployConfig.repositoryLink.substring(
      19,
      currentSiteDeployConfig.repositoryLink.length - 4
    );

    githubBranchLink =
      currentSiteDeployConfig.repositoryLink.substring(
        0,
        currentSiteDeployConfig.repositoryLink.length - 4
      ) +
      "/tree/" +
      currentSiteDeployConfig.repositoryBranch;
  }

  const scrollToWithContainer = (index) => {
    console.log(index);
    window.scrollTo({
      top: document.getElementById("deploy-logs-container").scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    var myElement = document.getElementById(`deploy-logs-items-${index}`);
    var topPos = myElement.offsetTop;
    document.getElementById("deploy-logs-list").scrollTop = topPos;
  };

  // console.log(currentSiteDeployLogs);

  return (
    currentSiteDeployConfig && (
      <div className="DeploySite">
        <div className="card-container max-width-set">
          <div className="create-site-card-header">
            <h2 className="create-site-card-header-title">
              {isDeployed ? "Published deploy" : "Deploy in Progress"}
            </h2>
            <p className="create-site-card-header-description">
              <u>Production</u>: {currentSiteDeployConfig.repositoryBranch}
              {/* - Last published at May 7 at 7:49 PM */}
            </p>
          </div>
          <div className="create-site-card-content">
            <div className="create-site-card-fields">
              <img
                src={require("../../assets/github-logo.svg")}
                alt="github"
                className="create-site-logo"
              />
              <a
                href={githubBranchLink}
                className="create-site-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {displayGithubRepo} (branch:{" "}
                {currentSiteDeployConfig.repositoryBranch})
              </a>
            </div>
            <div className="create-site-card-fields">
              <img
                src="https://unpkg.com/cryptoicons-cdn/images/AR.png"
                alt="github"
                className="create-site-logo"
              />
              {isDeployed ? (
                <a
                  href={deployedLink}
                  className="create-site-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview deploy on Arweave
                </a>
              ) : (
                <span className="create-site-link">
                  Deploying on Arweave, Preview in a minute
                </span>
              )}
            </div>
          </div>
        </div>
        {isDeployed && (
          <div className="card-container deploy-container">
            <div className="card-header-title">Deploy Summary</div>
            <div className="deploy-summary-item">
              <div className="deploy-summary-item-info-icon">
                <Info height={20} width={20} />
              </div>
              <div className="deploy-summary-item-info-container">
                <div className="deploy-summary-item-info-title">
                  Build time: 1m 52s. Total deploy time: 1m 52s
                </div>
                <div className="deploy-summary-item-info-description">
                  Build started at 7:49:38 PM and ended at 7:51:30 PM.
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="card-container deploy-container"
          id="deploy-logs-container"
        >
          <div className="card-header-title deploy-logs-card-title">
            <span className="card-header-deploy-title">Deploy Logs</span>
            {/* <button className="copy-to-clipboard-button">
              Copy to clipboard
            </button> */}
          </div>
          <div className="deploy-logs-container" id="deploy-logs-list">
            {currentSiteDeployLogs.map((currLog, i) => (
              <div
                className="deploy-logs-items"
                id={`deploy-logs-items-${i}`}
                key={i}
              >
                {currLog.time}:{" "}
                {currLog.log.indexOf("https://arweave.net/") !== -1 ? (
                  <a
                    href={currLog.log.trim()}
                    className="log-site-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currLog.log}
                  </a>
                ) : (
                  currLog.log
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default DeploySite;
