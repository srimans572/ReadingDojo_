import React from "react";

const handle = async () => {fetch('http://localhost:3080/api/gpt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ passage: 'Your passage goes here' }), // Replace with your actual passage data
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });}

const Test = () => {
    return(
        <div>
            <button onClick={handle}>click</button>
            <p>ef</p>
        </div>
    )
}

export default Test;



{questionData &&
  Object.values(questionData).map((questionData, index) => (
    <div className="questionBoxContainer"key={index}>
      <h3>Question {index + 1}:</h3>
      <p>{questionData.question}</p>
      <ul>
        {questionData.choices.map((choice, choiceIndex) => (
          <li key={choiceIndex}>{choice}</li>
        ))}
      </ul>
      <button onClick={async ()=> {console.log(index)}}>Delete</button>
      <button onClick={async ()=> {console.log(questionData)}}>Add</button>
    </div>
  ))}