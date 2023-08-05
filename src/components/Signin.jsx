import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/signup.css";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Account from "./Account";
import Decor from "./Decor";
import Loader from "./Loader";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokens, setTokens] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {signIn } = UserAuth();
  const user = sessionStorage.getItem("userSignedIn?")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      sessionStorage.setItem("userSignedIn?",true);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setError(true);
      return;
    }
    navigate("/account");
  };
  useEffect(() => {
    document.title = "ReadingDojo - Sign In";
  });
  return (
    <div>
      {user ? (
        <p>You are already Signed In</p>
      ) : (
        <div className="container">
          <Decor></Decor>
          <div className="signinContainer">
            <div className="card">
              <h1 className="signinText">Sign in</h1>
              <form className="formCard" onSubmit={handleSubmit}>
                <div className="formCardContent">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="formCardContent">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className=""
                    type="password"
                    placeholder="Password"
                  />
                </div>
                {error && (
                  <p className="invalidInput">Invalid email or password</p>
                )}
                <button className="signInButton">Sign In</button>
                <hr className="divider" />
                <p className="fillerText">Don't have an account yet?</p>
                <Link to="/signup" className="signLink">
                  Sign Up
                </Link>
              </form>
            </div>
            <p className="copyright">©2023 Reading Dojo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
