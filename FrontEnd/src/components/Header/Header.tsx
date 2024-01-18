import { FC, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import { UserContext } from "../../context/UserContext";
import { getPages } from "../../utils";

import "./Header.scss";
import Login from "../Login/Login";

const Header: FC = () => {
  const { isLoggedIn, logOut } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(`Navigated to: ${location.pathname}`);

  const pageTitle = "CityWiki";
  const pages = getPages();

  const handleUserLogoutButton = () => {
    logOut();
    navigate("/");
  }

  return (
    <div className="header">
      <div className="navbar">
        <Typography
          variant="h4"
          className="site-title"
          style={{ fontFamily: "Times New Roman, sans-serif" }}
        >
          {pageTitle}
        </Typography>

        <div>
          {pages.map((page) => {
            return (
              <Link className="page-link" key={page.path} to={page.path}>
                {page.title}
              </Link>
            );
          })}
        </div>

        {!isLoggedIn && <Login />}
        {isLoggedIn && (
          <Button onClick={handleUserLogoutButton} variant="outlined" color="inherit">
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
