import React, { useEffect, useState, useRef } from "react";
import { json, useNavigate, useLocation } from "react-router-dom";
import { exampleParagraphPlaceholder } from "../placeholder/placeholder";
import "../styles/print.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "./Loader";
import PageNotFound from "./PageNotFound";

const ToolResults = () => {
  let questions = [];
  const [questions_, setQuestions_] = useState([]);
  const [showanswers, setShowAnswers] = useState(false);
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState("Remove");
  const dummy = null;
  const { state } = useLocation();
  const questionData = state?.questionData;
  const passage = state?.passage;
  const title_ = state?.title;
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [title, setTitle] = useState(title_);
  const [questionAmount, setQuestionAmount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loader, showLoader] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState();
  const printPage = async () => {
    if (questions_.length == 0) {
      showLoader(true)
      setLoaderMessage("You need at least one question for this action.")
      return;
    }
    console.log(questionData);
    navigate("/print", {
      state: { passage: passage, questions: questions_, title: title },
    });
  };
  const bringQuiz = async () => {
    if ((questionData.choices in questionData) == true) {
      showLoader(true)
      setLoaderMessage("You can not perform this action for short answers at the moment.")
      return;
    }
    navigate("/quiz", { state: { passage: passage, questions: questionData } });
  };

  useEffect(() => {
    console.log(Array(questions_).length);
  });
  return (
    <div>
      {questionData ? (
        <div>
          <Navbar></Navbar>
          {(loader && <Loader loaderMessage={loaderMessage}></Loader>)}
          <div className="printContainer">
            <div className="passageBox">
              <div>
                <input
                  onChange={async (e) => {
                    setTitle(e.target.value);
                  }}
                  className="passagePrompt"
                  placeholder={title}
                ></input>
              </div>
              <br />
              <div className="passageTextBox">
                <p>{passage}</p>
              </div>
            </div>
            <div className="questionBox">
              <div className="questionsActionsBox">
                <p>
                  {questions_.length}/{Object.keys(questionData).length}{" "}
                  Questions Selected
                </p>
                <div
                  className="questionsActionsSpecifics"
                  style={{ display: "flex", }}
                >
                  {showanswers ? (
                    <div style={{ display: "flex", flexDirection:"column" }}>
                      <svg
                        onClick={async () => {
                          setShowAnswers(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icons"
                        height="1.5em"
                        viewBox="0 -110 600 600"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                      <p
                      style={{
                        fontSize: "8px",
                        textAlign: "center",
                        margin: "-7px",
                        padding: "0px",
              
                      }}
                    >
                      Hide Answers
                    </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection:"column"}}>
                      <svg
                        onClick={async () => {
                          setShowAnswers(true);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icons"
                        height="1.5em"
                        viewBox="0 -110 600 600"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                      <p
                      style={{
                        fontSize: "8px",
                        textAlign: "center",
                        margin: "-7px",
                        padding: "0px",
              
                      }}
                    >
                      Show Answers
                    </p>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={bringQuiz}
                      className="icons"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
                    </svg>
                    <p
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        margin: "-10px",
                        padding: "0px",
                      }}
                    >
                      Quiz
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <svg
                      onClick={printPage}
                      className="icons"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                    </svg>
                    <p
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        margin: "-10px",
                        padding: "0px",
                      }}
                    >
                      Print
                    </p>
                  </div>
                </div>
              </div>
              <div>{errors && <p>{errors}</p>}</div>
              {questionData &&
                Object.values(questionData).map((questionData, index) => (
                  <div className="questionBoxContainer" key={index}>
                    <h3 style={{ fontStyle: "normal" }}>
                      Question {index + 1}:
                    </h3>
                    <textarea
                      onChange={async (e) => {
                        questionData.question = e.target.value;
                        console.log(questionData);
                      }}
                      className="questions"
                      style={{ fontStyle: "normal" }}
                      defaultValue={questionData.question}
                    ></textarea>
                    {((questionData.choices==null)&&(showanswers==true))&& <div style={{backgroundColor:"whitesmoke", padding:"20px", borderRadius:"10px",marginTop:"20px"}}>Sample Short Answer: {questionData.correct_answer}</div>}
                    {questionData.choices && (
                      <ul>
                        {questionData.choices.map((choice, choiceIndex) => (
                          <div>
                            <li className="answerChoices" key={choiceIndex}>
                              <input
                                type="text"
                                onChange={async (e) => {
                                  let updatedChoices = [
                                    ...questionData.choices,
                                  ];
                                  if (
                                    updatedChoices[choiceIndex] ==
                                    questionData.correct_answer
                                  ) {
                                    updatedChoices[choiceIndex] =
                                      e.target.value; // Update the value at the specific index
                                    questionData.choices = updatedChoices;
                                    questionData.correct_answer =
                                      e.target.value;
                                  } else {
                                    updatedChoices[choiceIndex] =
                                      e.target.value; // Update the value at the specific index
                                    questionData.choices = updatedChoices;
                                  } // Create a copy of the choices list
                                  updatedChoices[choiceIndex] = e.target.value; // Update the value at the specific index
                                  questionData.choices = updatedChoices;

                                  let x =
                                    e.target.value ==
                                    questionData.choices[
                                      questionData.correct_answer
                                    ]
                                      ? choiceIndex
                                      : questionData.correct_answer;
                                  questionData.correct_answer = x;

                                  console.log(questionData);
                                }}
                                defaultValue={choice}
                                className={
                                 showanswers ?
                                  choice == questionData.correct_answer
                                    ? "questionchoicesbold"
                                    : "questionchoices" : "questionchoices"
                                }
                              />
                            </li>
                          </div>
                        ))}
                      </ul>
                    )}
                    <div className="questionActionsSpecific">
                      <button
                        className="questionActionButtons"
                        onClick={async () => {
                          if (questions_.includes(questionData) == true) {
                            return;
                          } else {
                            questions.push(questionData.question);
                            setAdded(true);
                            setQuestions_((previous) => [
                              ...previous,
                              questionData,
                            ]);
                            /*;
                          questions_.push(questionData);
                          console.log(questions_)*/
                          }
                          console.log(questions);
                          console.log(questions_);
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="questionActionButtons"
                        onClick={async () => {
                          let index = questions.indexOf(questionData.question);
                          if (questions_.includes(questionData) == false) {
                            return;
                          }
                          /*questions.splice(index);*/
                          const currentCopy = [...questions_];
                          currentCopy.splice(index);
                          setQuestions_(currentCopy);
                          console.log(questions_);
                        }}
                      >
                        Remove
                      </button>{" "}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <PageNotFound quizNotFoundError="Whoops! You haven't generated any questions yet."></PageNotFound>
      )}
      <Footer></Footer>
    </div>
  );
};

export default ToolResults;
