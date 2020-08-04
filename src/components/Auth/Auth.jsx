import React, { useContext } from "react";
import "./Auth.scss";
import { ArweaveService } from "../../services";
import { UploadCloud } from "react-feather";
import { ActionContext } from "../../hooks";

function Auth() {
  const { signIn } = useContext(ActionContext);
  // load file to json
  const walletLogin = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  // set pk json to state
  const handleFileRead = async (e) => {
    const jwk = JSON.parse(e.target.result);
    let address = await ArweaveService.getWalletAddress(jwk);
    signIn({ walletPrivateKey: jwk, walletAddress: address });
    // props.setWallet(jwk, address);
  };

  return (
    <div className="Auth">
      <div className="auth-import-title">Import wallet</div>
      <div className="auth-input-field">
        <input
          className="auth-file-import"
          type="file"
          id="file"
          accept="application/JSON"
          onChange={(e) => walletLogin(e.target.files[0])}
        />
        <div className="auth-upload-content">
          <div className="auth-upload-icon">
            <UploadCloud />
          </div>
          <div className="auth-upload-icon-title">
            Drop a wallet key-file to login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
