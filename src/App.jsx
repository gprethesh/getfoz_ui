import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Tos from "./routes/Tos";
import Privacy from "./routes/Privacy";
import Refund from "./routes/Refund";
import HistoryData from "./routes/Account/HistoryData";
import CreateEvent from "./routes/Account/CreateEvent";
import Account from "./routes/Account/Account";
import MyAccount from "./routes/Account/MyAccount";
import TransActions from "./routes/Account/TransActions";
import LiveEvents from "./routes/Account/LiveEvents";
import ClosedEvents from "./routes/Account/ClosedEvents";
import MyTrade from "./routes/Account/MyTrade";
import ResolvedEvents from "./routes/Account/ResolvedEvents";
import Login from "./base/Login";
import Signin from "./base/Signin";
import { SessionProvider } from "../src/components/SessionContext"; // Import the SessionProvider

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="overflow-x-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <SessionProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tos" element={<Tos />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/account" element={<Account />}>
              <Route path="/account/myaccount" element={<MyAccount />} />
              <Route
                path="/account/mytransactions"
                element={<TransActions />}
              />
              <Route path="/account/history" element={<HistoryData />} />
              <Route path="/account/liveevents" element={<LiveEvents />} />
              <Route path="/account/createevents" element={<CreateEvent />} />
              <Route path="/account/closedevents" element={<ClosedEvents />} />
              <Route
                path="/account/resolvedevents"
                element={<ResolvedEvents />}
              />
              <Route path="/account/mytrade" element={<MyTrade />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/signin" element={<Signin />} />
            </Route>
          </Routes>
          <Footer />
        </SessionProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
