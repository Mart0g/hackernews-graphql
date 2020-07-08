import React from "react";
import { withRouter } from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";
import { LOGIN, LOGOUT, TITLE, SUBMIT, NEW } from "../utils/constants";
import { getToken, deleteToken } from "../utils/token";

const Header = ({ history }: RouteComponentProps) => {
  const isLoggedIn = !!getToken();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">{TITLE}</div>
        <Link to="/" className="ml1 no-underline black">
          {NEW}
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/submit" className="ml1 no-underline black">
              {SUBMIT.toLowerCase()}
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {isLoggedIn ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              deleteToken();
              history.push("/");
            }}
          >
            {LOGOUT}
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            {LOGIN.toLowerCase()}
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
