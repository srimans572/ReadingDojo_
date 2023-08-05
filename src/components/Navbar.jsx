import React from "react";
import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("userSignedIn?")
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.navBar}>
      <div>
        <Link to="/account">
          <img className={styles.logoNavBar} src={require("./logo.png")}></img>
        </Link>
      </div>

      <button className={styles.navBarLogOut} onClick={handleLogout}>
        {user ? "Logout" : "Sign In"}
      </button>
    </div>
  );
};

export default Navbar;
