import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const GuardedRoute: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);

  console.log({ isLoggedIn, children });
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuardedRoute;
