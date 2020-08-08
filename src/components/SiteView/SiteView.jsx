/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "./SiteView.scss";
import { Info } from "react-feather";
import { StateContext, ActionContext } from "../../hooks";
import { APIService } from "../../services";
import moment from "moment";
import { useParams } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";

function SiteView() {
  const { id } = useParams();
  const { setCurrentSiteViewConfig, getAllSites } = useContext(ActionContext);
  const { currentSiteViewConfig, allSites, walletAddress } = useContext(
    StateContext
  );

  useEffect(() => {
    if (walletAddress && !allSites.length) {
      getAllSites(walletAddress);
    }
    if (!currentSiteViewConfig && allSites.length) {
      console.log(id);
      const currentSite = allSites.filter((site) => site.id === id)[0];
      setCurrentSiteViewConfig(currentSite);
    }
  }, [allSites]);

  console.log(currentSiteViewConfig);
  let displayGithubRepo = "";
  let githubBranchLink = "";
  if (currentSiteViewConfig) {
    displayGithubRepo = currentSiteViewConfig.gitUrl.substring(
      19,
      currentSiteViewConfig.gitUrl.length - 4
    );

    githubBranchLink =
      currentSiteViewConfig.gitUrl.substring(
        0,
        currentSiteViewConfig.gitUrl.length - 4
      ) +
      "/tree/" +
      currentSiteViewConfig.branch;
  }

  let buildMin = 0,
    buildSec = 0;
  if (currentSiteViewConfig) {
    buildMin = Number.parseInt(
      Number.parseInt(currentSiteViewConfig.buildTime) / (1000 * 60)
    );
    buildSec = Number.parseInt(
      (Number.parseInt(currentSiteViewConfig.buildTime) / 1000) % 60
    );
  }

  // console.log(currentSiteDeployLogs);

  return (
    currentSiteViewConfig && (
      <div className="DeploySite">
        <div className="card-container max-width-set">
          <div className="create-site-card-header">
            <h2 className="create-site-card-header-title">
              {"Published deploy"}
            </h2>
            <p className="create-site-card-header-description">
              <u>Production</u>: {currentSiteViewConfig.branch}
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
                {displayGithubRepo} (branch: {currentSiteViewConfig.branch})
              </a>
            </div>
            <div className="create-site-card-fields">
              <img
                src="https://unpkg.com/cryptoicons-cdn/images/AR.png"
                alt="github"
                className="create-site-logo"
              />

              <a
                href={currentSiteViewConfig.deployedLink}
                className="create-site-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview deploy on Arweave
              </a>
            </div>
          </div>
        </div>
        <div className="card-container deploy-container">
          <div className="card-header-title">Deploy Summary</div>
          <div className="deploy-summary-item">
            <div className="deploy-summary-item-info-icon">
              <Info height={20} width={20} />
            </div>
            <div className="deploy-summary-item-info-container">
              <div className="deploy-summary-item-info-title">
                Total time to Build & Deploy: {buildMin}m {buildSec}s
              </div>
              <div className="deploy-summary-item-info-description">
                Process started at {currentSiteViewConfig.logs[0].time} and
                ended at{" "}
                {
                  currentSiteViewConfig.logs[
                    currentSiteViewConfig.logs.length - 1
                  ].time
                }
                .
              </div>
            </div>
          </div>
        </div>
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
            {currentSiteViewConfig.logs.map((currLog, i) => (
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

export default SiteView;
