import React, { createContext, useMemo } from "react";
import { ArweaveService, APIService } from "../services";
import { useHistory } from "react-router-dom";

export const ActionContext = createContext();
export const StateContext = createContext();

export const AppProvider = (props) => {
  const history = useHistory();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            wallet: null,
            walletAddress: "",
            userName: "",
          };
        case "TOGGLE_MODAL":
          return {
            ...prevState,
            openModal: action.modal.openModal,
            modalConfig: action.modal.modalConfig,
          };
        case "SET_CURRENT_SITE_DEPLOY_CONFIG":
          return {
            ...prevState,
            currentSiteDeployConfig: action.currentSiteDeployConfig,
          };
        case "SET_CURRENT_SITE_DEPLOY_LOGS":
          return {
            ...prevState,
            currentSiteDeployLogs: action.currentSiteDeployLogs,
          };
        case "SET_ALL_SITES":
          return {
            ...prevState,
            allSites: action.allSites,
          };
        case "SET_CURRENT_SITE_VIEW_CONFIG":
          return {
            ...prevState,
            currentSiteViewConfig: action.currentSiteViewConfig,
          };
        case "SET_SITE_LOADING":
          return {
            ...prevState,
            sitesLoading: action.sitesLoading,
          };
        default:
      }
    },
    {
      wallet: JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress: sessionStorage.getItem("walletAddress"),
      userName: sessionStorage.getItem("userName"),
      openModal: false,
      modalConfig: {},
      currentSiteDeployConfig: null,
      currentSiteDeployLogs: [],
      allSites: [],
      currentSiteViewConfig: null,
      sitesLoading: false,
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: async (pData) => {
        pData.userName = await ArweaveService.getName(pData.walletAddress);
        sessionStorage.setItem(
          "wallet",
          JSON.stringify(pData.walletPrivateKey)
        );
        sessionStorage.setItem("walletAddress", pData.walletAddress);
        sessionStorage.setItem("userName", pData.userName);
        dispatch({ type: "SIGN_IN", wallet: pData });
        dispatch({
          type: "TOGGLE_MODAL",
          modal: { openModal: false, modalConfig: {} },
        });
        history.push("/site");
      },
      signOut: () => {
        sessionStorage.removeItem("wallet");
        sessionStorage.removeItem("walletAddress");
        sessionStorage.removeItem("userName");
        dispatch({ type: "SIGN_OUT" });
        history.push("/");
      },
      restoreWallet: () => {
        const data = {
          walletPrivateKey: JSON.parse(sessionStorage.getItem("wallet")),
          walletAddress: sessionStorage.getItem("walletAddress"),
          userName: sessionStorage.getItem("userName"),
        };
        dispatch({ type: "RESTORE_TOKEN", wallet: data });
      },
      toggleModal: (modal) => {
        console.log(modal);
        dispatch({ type: "TOGGLE_MODAL", modal });
      },
      setCurrentSiteDeployConfig: (config) => {
        console.log(config);
        dispatch({
          type: "SET_CURRENT_SITE_DEPLOY_LOGS",
          currentSiteDeployLogs: [],
        });
        dispatch({
          type: "SET_CURRENT_SITE_DEPLOY_CONFIG",
          currentSiteDeployConfig: config,
        });
      },
      setCurrentSiteDeployLogs: (logs) => {
        console.log(logs);
        dispatch({
          type: "SET_CURRENT_SITE_DEPLOY_LOGS",
          currentSiteDeployLogs: logs,
        });
      },
      getAllSites: async (walletAddress) => {
        dispatch({
          type: "SET_SITE_LOADING",
          sitesLoading: true,
        });
        const allSites = await APIService.getAllSites(walletAddress);
        dispatch({
          type: "SET_ALL_SITES",
          allSites,
        });
        dispatch({
          type: "SET_SITE_LOADING",
          sitesLoading: false,
        });
      },
      setCurrentSiteViewConfig: (config) => {
        dispatch({
          type: "SET_CURRENT_SITE_VIEW_CONFIG",
          currentSiteViewConfig: config,
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
