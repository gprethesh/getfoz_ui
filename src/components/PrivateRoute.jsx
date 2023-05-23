// PrivateRoute.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SessionContext } from "./SessionContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  return session ? children : null;
};

export default PrivateRoute;
