/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "./DisplaySites.scss";
import { useHistory } from "react-router-dom";
import { ActionContext, StateContext } from "../../hooks";
import { ChevronRight } from "react-feather";
import moment from "moment";
import Loader from "react-loader-spinner";

function DisplaySites() {
  const history = useHistory();
  const { getAllSites, setCurrentSiteViewConfig } = useContext(ActionContext);
  const { walletAddress, allSites, sitesLoading } = useContext(StateContext);

  useEffect(() => {
    if (walletAddress) {
      getAllSites(walletAddress);
    }
  }, [walletAddress]);

  const navigateSite = (site) => {
    setCurrentSiteViewConfig(site);
    history.push(`/site/view/${site.id}`);
  };

  return (
    <div className="DisplaySites">
      <div className="card-container">
        {!sitesLoading ? (
          <>
            <div className="card-header">
              <h3 className="deployed-site-title">Deployed Sites</h3>
              <button
                type="button"
                className="deployed-site-button"
                onClick={(e) => history.push("/site/start")}
              >
                Add New Site
              </button>
            </div>
            <div className="card-content">
              {allSites &&
                allSites.map((site, id) => (
                  <div
                    className="site-item"
                    key={id}
                    onClick={(e) => navigateSite(site)}
                  >
                    <div className="site-item-content">
                      <div className="site-item-row-1">
                        <div className="site-item-link">
                          {site.deployedLink.substring(
                            8,
                            site.deployedLink.length
                          )}
                        </div>
                        <div className="site-item-released">
                          Published at{" "}
                          {moment.unix(site.time).format("YYYY-MM-DD hh:mm A")}
                        </div>
                      </div>
                      <div className="site-item-row-2">
                        <div className="site-item-git">
                          {site.gitUrl.substring(19, site.gitUrl.length - 4)}
                        </div>
                        <div className="site-item-branch">
                          (branch: {site.branch})
                        </div>
                      </div>
                    </div>
                    <div className="site-item-right">
                      <ChevronRight />
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="loader-container">
            <Loader
              type="Grid"
              color="#3261b8"
              height={100}
              width={100}
              style={{ display: "flex" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplaySites;
