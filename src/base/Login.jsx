import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

import * as waxjs from "@waxio/waxjs/dist";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";

const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
});
const dapp = "Getfoz";
let waxAddress;
let type;

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const transport = new AnchorLinkBrowserTransport();

  const link = new AnchorLink({
    transport,
    chains: [
      {
        chainId:
          "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
        nodeUrl: "https://api.wax.bountyblok.io",
      },
    ],
  });

  const anchorClick = async () => {
    const identity = await link.login(dapp);
    const { session } = identity;
    const key = String(session.auth);
    waxAddress = String(key.split("@")[0]);
    type = String(key).split("@")[1];
  };

  return (
    <>
      <div>
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#212345] rounded shadow-lg w-full sm:w-4/5 lg:w-1/2 px-10 py-8">
              <button
                onClick={togglePopup}
                className="float-right text-2xl font-bold leading-none cursor-pointer"
              >
                {" "}
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <form>
                <div className="mb-4">
                  {" "}
                  <button
                    className="bg-[#f27208] hover:bg-[#201811] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Wax Cloud Wallet
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="bg-[#0055FF] hover:bg-[#201811] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={anchorClick}
                  >
                    Wax Anchor Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
