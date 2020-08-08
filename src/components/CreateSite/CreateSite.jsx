/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import "./CreateSite.scss";
import { useHistory } from "react-router-dom";
import { ActionContext } from "../../hooks";

function CreateSite() {
  const history = useHistory();

  const { setCurrentSiteDeployConfig } = useContext(ActionContext);

  const [framework, setFramework] = useState("react");
  const [repositoryLink, setRepositoryLink] = useState(
    "https://github.com/rekpero/arweave-neighbour-tweet-react.git"
  );
  const [repositoryBranch, setRepositoryBranch] = useState("dev");
  const [buildCommand, setBuildCommand] = useState("npm run build");
  const [packageManager, setPackageManager] = useState("npm");
  const [publishDir, setPublishDir] = useState("build");

  const frameworkOptions = [
    {
      value: "react",
      label: "React App",
    },
  ];

  const packageManagers = [
    {
      value: "npm",
      label: "NPM",
    },
    {
      value: "yarn",
      label: "Yarn",
    },
  ];

  const handleChange = (selectedOption) => {
    setFramework(selectedOption);
  };

  const deployNow = () => {
    const id = (Math.random() * 1e32).toString(36).substring(0, 10);
    const deploySettings = {
      id,
      framework,
      repositoryLink,
      repositoryBranch,
      packageManager,
      buildCommand,
      publishDir,
    };
    setCurrentSiteDeployConfig(deploySettings);
    history.push(`/site/deploy/${id}`);
  };

  return (
    <div className="CreateSite">
      <div className="card-container">
        <div className="create-site-card-header">
          <h2 className="create-site-card-header-title">Create a new site</h2>
          <p className="create-site-card-header-description">
            From zero to hero in just one step
          </p>
        </div>
        <div className="create-site-form">
          <div className="create-site-form-whole-container">
            <h3 className="create-site-form-header">Deploy settings</h3>
            <div className="create-site-form-container">
              <label className="create-site-form-label">Repository link</label>
              <input
                type="text"
                placeholder="Enter repository link"
                className="create-site-form-input"
                value={repositoryLink}
                onChange={(e) => setRepositoryLink(e.target.value)}
              />
            </div>
            <div className="create-site-form-container">
              <label className="create-site-form-label">
                Repository branch
              </label>
              <input
                type="text"
                placeholder="Enter repository branch"
                className="create-site-form-input"
                value={repositoryBranch}
                onChange={(e) => setRepositoryBranch(e.target.value)}
              />
            </div>
          </div>
          <div className="create-site-form-whole-container">
            <h3 className="create-site-form-header">Basic build settings</h3>
            <div className="create-site-form-container">
              <label className="create-site-form-label">Framework</label>
              <select
                className="create-site-form-input select-form-input"
                value={framework}
                onChange={(e) => handleChange(e.target.value)}
              >
                {frameworkOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="create-site-form-container">
              <label className="create-site-form-label">Package manager</label>
              <select
                className="create-site-form-input select-form-input"
                value={packageManager}
                onChange={(e) => setPackageManager(e.target.value)}
              >
                {packageManagers.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="create-site-form-container">
              <label className="create-site-form-label">Build command</label>
              <input
                type="text"
                placeholder="e.g. npm run build or yarn build"
                className="create-site-form-input"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
              />
            </div>
            <div className="create-site-form-container">
              <label className="create-site-form-label">
                Publish directory
              </label>
              <input
                type="text"
                placeholder="e.g. build or dist"
                className="create-site-form-input"
                value={publishDir}
                onChange={(e) => setPublishDir(e.target.value)}
              />
            </div>
          </div>
          <button className="create-site-button" onClick={deployNow}>
            Deploy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSite;
