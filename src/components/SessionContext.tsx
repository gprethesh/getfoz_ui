import React, { useState, useEffect, createContext, ReactNode } from "react";
import SessionKit, { BrowserLocalStorage, Session } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import WebUIRenderer from "@wharfkit/web-renderer";
import { useNavigate } from "react-router-dom";

const sessionKit = new SessionKit({
  appName: "getfoz",
  chains: [
    {
      id: import.meta.env.VITE_APP_WAX_CHAIN,
      url: import.meta.env.VITE_APP_API_URL,
    },
  ],
  storage: new BrowserLocalStorage("getfoz"),
  ui: new WebUIRenderer(),
  walletPlugins: [new WalletPluginAnchor()],
});

//  new WalletPluginCloudWallet()

interface SessionContextProps {
  session: Session | undefined;
  login: () => Promise<void>;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | undefined>();

  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  const login = async () => {
    const response = await sessionKit.login();
    setSession(response.session);
    navigate("/account/myaccount");
  };

  const logout = () => {
    sessionKit.logout(session);
    setSession(undefined);
    navigate("/");
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
