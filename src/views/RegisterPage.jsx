import { useState } from "react";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [sentInfo, setSentInfo] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passordsMatch, setPasswordsMatch] = useState(false);

  const errMessage = <div>Passwords must match</div>;

  const usernameInputHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);

    if (secondPassword !== e.target.value) {
      setPasswordError(true);
      setPasswordsMatch(false);
    } else if (secondPassword === e.target.value) {
      setPasswordError(false);
      setPasswordsMatch(true);
    }
  };

  const secondPasswordInputHandler = (e) => {
    setSecondPassword(e.target.value);

    if (password !== e.target.value) {
      setPasswordError(true);
      setPasswordsMatch(false);
    } else if (password === e.target.value) {
      setPasswordError(false);
      setPasswordsMatch(true);
    }
  };

  const register = () => {
    const data = {
      username,
      password,
    };

    submitInfo(data);
  };

  const submitInfo = (data) => {
    try {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          setSentInfo(true);
        });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div
      className="card mx-auto mt-3"
      style={{ width: "50%", backgroundColor: "aquamarine" }}
    >
      <div className="card-body">
        <h5 className="card-title">
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input
            className="form-control"
            onChange={usernameInputHandler}
            value={username}
            type="text"
            id="username"
          />
        </h5>
        <hr />
        <h5 className="card-text">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            className="form-control mb-3"
            onChange={passwordInputHandler}
            value={password}
            type="password"
            id="password"
          />
        </h5>
        <h5 className="card-text">
          <label htmlFor="secondPassword" className="mb-1">
            Confirm Password
          </label>
          <input
            className="form-control mb-3"
            onChange={secondPasswordInputHandler}
            value={secondPassword}
            type="password"
            id="secondPassword"
          />
        </h5>
        <hr />
        <div className="card-text">
          {passordsMatch && (
            <button className="btn btn-info me-3 text-light" onClick={register}>
              Register
            </button>
          )}
          {passwordError ? errMessage : ""}
          {sentInfo && <Navigate replace to="/" />}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
