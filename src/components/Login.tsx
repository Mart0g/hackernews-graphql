import React, { useState, useCallback } from "react";
import { RouteComponentProps } from 'react-router-dom'
import { useMutation } from "urql";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../utils/queries";
import {
  LOGIN,
  SIGN_UP,
  NEW_ACCOUNT,
  EXISTING_ACCOUNT,
  CREATE_ACCOUNT,
  USER_NOT_FOUND,
  ERROR,
} from "../utils/constants";
import { setToken } from "../utils/token";

const Login = ({ history }: RouteComponentProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [{ fetching }, executeMutation] = useMutation(
    isLoggedIn ? LOGIN_MUTATION : SIGNUP_MUTATION
  );

  const onClick = useCallback(() => {
    executeMutation({ email, password, name })
      .then(({ data }) => {
        const loginData = data && data[isLoggedIn ? "login" : "signup"];
        if (!loginData) setError(USER_NOT_FOUND);
        const token = loginData && loginData.token;
        if (token) {
          setToken(token);
          history.push("/");
        }
      })
      .catch((error) => {
        setError(ERROR);
      });
  }, [executeMutation, history, isLoggedIn, email, password, name]);

  return (
    <div>
      <h4 className="mv3">{isLoggedIn ? LOGIN : SIGN_UP}</h4>

      <div className="flex flex-column">
        {!isLoggedIn && (
          <input
            className="mb2"
            value={name}
            onChange={({ target }) => setName(target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          className="mb2"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          className="mb2"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Your password"
        />
      </div>

      {error && <h5 className="mv3">{error}</h5>}

      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          disabled={fetching}
          onClick={onClick}
        >
          {isLoggedIn ? LOGIN.toLowerCase() : CREATE_ACCOUNT}
        </button>
        <button
          type="button"
          className="pointer button"
          disabled={fetching}
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? NEW_ACCOUNT : EXISTING_ACCOUNT}
        </button>
      </div>
    </div>
  );
};

export default Login;
