import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SessionKit, { BrowserLocalStorage, Session } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import WebUIRenderer from "@wharfkit/web-renderer";
import React from "react";

const sessionKit = new SessionKit({
  appName: "demo",
  chains: [
    {
      id: "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
      url: "https://wax-testnet.eosphere.io",
    },
  ],
  storage: new BrowserLocalStorage("demo"),
  ui: new WebUIRenderer(),
  walletPlugins: [new WalletPluginAnchor(), new WalletPluginCloudWallet()],
});

const Signin = () => {
  const [session, setSession]: [
    Session | undefined,
    Dispatch<SetStateAction<Session | undefined>>
  ] = useState();

  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  async function login() {
    const response = await sessionKit.login();
    setSession(response.session);
  }

  async function logout() {
    sessionKit.logout(session);
    setSession(undefined);
  }

  return (
    <>
      <>hello</>
      <div className="App">
        <div className="card">
          {!session ? (
            <button className="primary" onClick={login}>
              Login
            </button>
          ) : (
            <React.Fragment>
              <p>{String(session.actor)}</p>
              {/* <button className="primary" onClick={transact}>
          Test Transaction (No Broadcast)
      </button> */}
              <button onClick={logout}> Logout </button>
            </React.Fragment>
          )}
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite, React, and Wharf logos to learn more
        </p>
      </div>
    </>
  );
};

export default Signin;
