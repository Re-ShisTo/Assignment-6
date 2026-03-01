import React, { useState } from "react";
import {
  auth,
  githubProvider,
  googleProvider,
  logIn,
  signUp,
} from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [signState, setSignState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const user_auth = async (e) => {
    e.preventDefault();

    if (signState === "Sign Up" && password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    try {
      if (signState === "Login") {
        await logIn(email, password);

        alert("Login Successfull");
      } else {
        await signUp(name, email, password);
        alert("Account created successfully! Please login");

        setSignState("Login");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const logInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInWithGithub = async () => {
    try {
      const res = await signInWithPopup(auth, githubProvider);
      const user = res.user;
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={user_auth}>
        <div className="container">
          {signState === "Sign Up" ? (
            <input
              value={name}
              type="text"
              placeholder="Enter Your Name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          ) : null}
          <input
            value={email}
            type="text"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn">
            <button type="submit" className="submit-btn">
              {signState}
            </button>
          </div>

          <div className="check">
            <input type="checkbox" name="remember" />
            <p>Remember me</p>
          </div>
        </div>

        {signState === "Login" ? (
          <div className="down-container">
            <div className="switch">
              <p>Don't have an account?</p>
              <button
                type="button"
                className="switch-btn"
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up
              </button>
            </div>
            <div className="p-login">
              <p>Sign in with</p>
              <button type="button" onClick={logInWithGoogle}>
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" onClick={logInWithGithub}>
                <i className="fa-brands fa-github"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="down-container">
            <div className="switch">
              <p>Already have an account?</p>
              <button
                type="button"
                className="switch-btn"
                onClick={() => setSignState("Login")}
              >
                Login
              </button>
            </div>

            <div className="p-login">
              <p>Sign in with</p>
              <button type="button" onClick={logInWithGoogle}>
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" onClick={logInWithGithub}>
                <i className="fa-brands fa-github"></i>
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default Login;
