import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import Navbar from "./Navbar";
import styles from "../styles/account.module.css";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState();
  const [name, setName] = useState();
  const [sets, setSets] = useState();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user) {
      try {
        const getDocument = async () => {
          try {
            const data = await (
              await getDoc(doc(db, "users", user.email))
            ).data();
            const result = await data["tokens"];
            const firstName = await data["first_name"];
            const questionSets = await data["question_Set"];
            console.log("1")
            setTokens(result);
            setName(firstName);
            setSets(questionSets);
          } catch (error) {}
        };
        getDocument();
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const handleClick = (rowData) => {
    console.log(rowData);
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <Navbar></Navbar>
      {user ?
      <div className={styles.container}>
        <h1 className={styles.dashboard}>Dashboard</h1>
        <hr></hr>
        <div className={styles.accountinfos}>
          <div className={styles.accountdetails}>
            <div>
          <p className={styles.savedSetsText}>Account Info</p>
            <p>Email: {user && user.email} </p>
            {name ? <p>Hello, {name}!</p> : <p>Hello!</p>}
            <p>Credits Left: {tokens}</p>
            </div>
            <br />
            <button onClick={async()=>{navigate("/Tool")}} className={styles.button}>Generate Questions</button>
            <hr></hr>
          </div>
      <div className={styles.tableContainer}>
      <p className={styles.savedSetsText}>Saved Sets</p>
          <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Passage</th>
                  <th>Questions</th>

                  <th>Open</th>
                </tr>
              </thead>
              <tbody>
                {sets ? (
                  sets.map((item, index) => (
                    <tr key={index}>
                      <td>{item.set.title}</td>
                      <td>{(item.set.passage).slice(0,100)}...{(item.set.passage).slice(-1,-10)}</td>
                      <td>{Object.keys(item.set.questionData).length}</td>
                      <td>
                        <button
                          onClick={async () => {
                            navigate(`/tool-results/mcq/`, {state:{passage:item.set.passage, questionData:item.set.questionData, title:item.set.title}})
                          }}
                          className={styles.buttonSavedSet}
                        >
                          Open Set
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Sets Created Yet!</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
        </div>
        
      </div> : <PageNotFound notSignedIn={true} quizNotFoundError="Whoops! You aren't Signed In To Access The Dashboard"></PageNotFound>}
      <Footer></Footer>
    </div>
  );
};

export default Account;
