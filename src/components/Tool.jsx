import { useEffect, useState } from "react";
import { React } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Loader from "./Loader";
import styles from "../styles/tool.module.css";
import styles_ from "../styles/settings.module.css";
import firebase from "firebase/compat/app";
import { FieldValue } from "firebase/firestore";
import "firebase/firestore";
import {
  exampleParagraphPlaceholder,
  paragraphPlaceholder,
  promptPlaceholder,
} from "../placeholder/placeholder";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Tool = () => {
  const [prompt, setPrompt] = useState();
  const [generateClicked, setGenerateClicked] = useState(false);
  const [loaderError, setLoaderError] = useState();
  const [passage, setPassage] = useState();
  const [passageReady, setPassageReady] = useState(false);
  const [promptError, setPromptError] = useState();
  const [question_amount, setQuestionAmount] = useState(1);
  const [question_format, setQuestionFormat] = useState("multiplechoice");
  const [question_style, setQuestionStyle] = useState("standard");
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");
  const [language, setLanguage] = useState("english");
  const [error, setError] = useState();
  const [title, setTitle] = useState();
  const [questionData, setQuestionData] = useState();
  const { user, logout } = UserAuth();
  const [tokens, setTokens] = useState();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(1);
  const navigate = useNavigate();
  const [docRef, setDocRef] = useState();

  useEffect(() => {
    if (user) {
      try {
        const getDocument = async () => {
          try {
            const data = await (
              await getDoc(doc(db, "users", user.email))
            ).data();
            const result = await data["tokens"];
            console.log(1)
            setTokens(result); 
          } catch (error) {}
        };
        getDocument();
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  /*useEffect(()=>{
        if(tokens){
            checkTokens()
        }
    },[tokens])*/

  const validateInput = async () => {
    if (title == undefined || title.length < 10) {
      setPromptError("Set a title before generating questions");
      console.log(promptError);
      return;
    } else {
      if (prompt == undefined || prompt.length < 10) {
        if (passage == undefined || passage.length < 1000) {
          setPromptError(
            "Whoops... You do not have a passage. Enter a prompt for passage generation"
          );
          return;
        }
      }
    }
    checkTokens();
  };
  const checkTokens = async () => {
    if (tokens < 1) {
      setPromptError("Insufficient amount of credits, get more.")
      return;
    } else {
      console.log("checking for tokens");
      checkForPassage();
    }
  };
  const checkForPassage = async () => {
    if (passage == undefined || passage.length < 100) {
      console.log("getting passage");
      setLoaderOpen(true);
      getPassage();
    } else {
      setPassageReady(true);
    }
  };

  const getPassage = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        language: language,
      }),
    };
    try {
      const response = await fetch(
        "https://rdend.funkus.repl.co/passage",
        options
      );
      const data = await response.json();
      console.log(data);
      setPassage(data.choices[0].message.content);
      setPassageReady(true);
    } catch (error) {
      console.error(error);
      setLoaderOpen(false);
    }
  };

  useEffect(() => {
    if (passageReady) {
      const generateQuestions = async () => {
        setLoaderOpen(true);
        const options = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passage: passage,
            specifications: [
              defaultValue,
              question_format,
              questionDifficulty,
            ],
            language: language,
          }),
        };
        try {
          const response = await fetch(
            "https://rdend.funkus.repl.co/questions",
            options
          );
          const data = await response.json();
          console.log(data);
          setQuestionData(JSON.parse(data.choices[0].message.content));
          console.log(questionData);
          try{
            setTokens(tokens-1)
            console.log(tokens)
            await updateDoc (doc(db,"users",user.email),{
                tokens: tokens-1
            });}
            catch{
        
            }
        } catch (error) {
        setLoaderError("There was an error in generating your questions. Your credits have been refunded. Please try again")
          console.log(error);
          try{
            setTokens(tokens+1)
            console.log(tokens)
            await updateDoc (doc(db,"users",user.email),{
                tokens: tokens+1
            });}
            catch{
        
            }
        }
      };
      generateQuestions();
    }
  }, [passageReady]);

  useEffect(() => {
    if (questionData) {
      setLoaderOpen(false);
      try {
        saveSet();
      } catch {}
      navigate("/tool-results/mcq/", {
        state: { questionData: questionData, passage: passage, title: title },
      });
    }
  }, [questionData]);

  const saveSet = async () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    await updateDoc(doc(db, "users", user.email), {
      question_Set: arrayUnion({
        set: {
          passage: passage,
          title: title,
          questionData: questionData,
          uniqueId: uniqueId,
        },
      }),
    });
    
  };

  useEffect(() => {
    console.log(
      language,
      questionDifficulty,
      defaultValue,
      question_format
    );
  });

  return (
    <div>
      {" "}
      <Navbar></Navbar>
      <div className={styles.container_}>
        {loaderOpen && <Loader loaderMessage={loaderError}></Loader>}
        <div className={styles_.Container}>
          <div className="settings">
            <div className={styles_.container}>
              <h2 className={styles_.title}>Settings</h2>
              <div className={styles_.setting}>
                <label className={styles_.label} htmlFor="numberOfQuestions">
                  Number of Questions:
                </label>
                <input
                  className={styles_.input}
                  onChange={(e) => {
                    setDefaultValue(e.target.value);
                  }}
                  type="range"
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  min="1"
                  max="20"
                  step={1}
                  defaultValue="1"
                />
                <p> {defaultValue}</p>
              </div>
              <div className={styles_.setting}>
                <label className={styles_.label} htmlFor="questionFormat">
                  Question Format:
                </label>
                <select
                  className={styles_.select}
                  id="questionFormat"
                  name="questionFormat"
                  onChange={(e) => {
                    setQuestionFormat(e.target.value);
                  }}
                >
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="shortanswer">Short Answer</option>
                </select>
              </div>
              <div className={styles_.setting}>
                <label className={styles_.label} htmlFor="questionStyle">
                  Question Difficulty:
                </label>
                <select
                  className={styles_.select}
                  id="questionDifficulty"
                  name="questionDifficulty"
                  onChange={(e) => {
                    setQuestionDifficulty(e.target.value);
                  }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <hr />
              <h2 className={styles_.title}>Additional Options</h2>
              <div className={styles_.setting}>
                <label className={styles_.label} htmlFor="questionStyle">
                  Language:{" "}
                </label>
                <select
                  className={styles_.select}
                  id="questionStyle"
                  name="questionStyle"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className={styles.button}>
                <button
                  className={styles.generateButton}
                  onClick={validateInput}
                >
                  Generate
                </button>
              </div>
              {promptError && (
                <p className={styles.promptError}>{promptError}!</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.title} htmlFor="styles.text">
            Title
          </label>
          <p>Name your question set</p>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="prompt"
            type="text"
            placeholder="Chemistry of Earth's System Honors Reading Worksheet"
            
          />
          <br />
          <br />
          <label className={styles.prompt} htmlFor="styles.text">
            Prompt
          </label>
          <p>This should be the general topic or idea of the passage.</p>
          <input
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            id="prompt"
            type="text"
            placeholder={promptPlaceholder}
          />
          <br />
          <br />
          <label className={styles.passage} htmlFor="text">
            Passage
          </label>
          <p>
            Write or copy and paste student reading from any source (or leave
            this blank, and we'll write it for you).
          </p>
          <textarea
            className={styles.textarea}
            name="passage"
            onChange={(e) => {
              setPassage(e.target.value);
            }}
            id="passage"
            placeholder={
              paragraphPlaceholder + "\n\n" + exampleParagraphPlaceholder
            }
            rows="25"
            maxLength={6000}
          ></textarea>
          <p className={styles.passageCharCount}>
            {0 ? passage.length == undefined : passage && passage.length}/6000
            Characters
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};
export default Tool;
