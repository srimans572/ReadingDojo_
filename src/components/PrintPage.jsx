import React from "react"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import styles from "../styles/printpage.module.css"

const PrintPage = () => {

    const {state} = useLocation()
    const passage = state?.passage
    const questions = state?.questions
    const title = state?.title

    useEffect(()=>{
        window.print()
    })
    
    return(
    <div className={styles.realPrintContainer}>
            <div className={styles.titlePrint}><h1>{title}</h1>
            <div>
                <p>Name:_______________________</p>
                <p>Date:________________________</p>
            </div>
            </div>
           <div className={styles.printContainer}>
            {passage && <p style={{fontFamily: "TrebuchetMS", fontStyle:"normal", lineHeight:"15px", whiteSpace:"pre-wrap"}} >{passage}</p>}
            {questions &&
            Object.values(questions).map((questions, index) => (
              <div className={styles.printQuestions} style={{lineHeight:"1px"}} key={index}>
                <h3 style={{fontFamily: "Verdana", fontStyle:"normal"}}>Question {index + 1}:</h3>
                <p style={{fontFamily: "TrebuchetMS", fontStyle:"normal"}}>{questions.question}</p>
                {questions.choices && <ul>
                  {questions.choices.map((choice, choiceIndex) => (
                    <li style={{fontFamily: "TrebuchetMS", fontStyle:"normal", margin: '10px', lineHeight:"13px"}} className="answerChoices" key={choiceIndex}>
                     {String.fromCharCode(65+choiceIndex)}. {choice}
                    </li>
                  ))}
                </ul>}
                {questions.choices==null && <div><br /><hr></hr><br /><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><hr></hr></div>}
              </div>
            ))}
           
        </div> 
    </div>
     
    )
}

export default PrintPage