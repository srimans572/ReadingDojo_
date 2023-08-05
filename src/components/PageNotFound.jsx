import React from "react"
import styles from "../styles/404.module.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
const PageNotFound = (props) =>{
    return (
        <div className={styles.pageNotFoundContainer}>
            <h1 style={{fontSize:"200px", margin:"100px"}}>404</h1>
            {props.quizNotFoundError ? <p>{props.quizNotFoundError}</p> : <p>Whoops! This is not part of the Dojo</p>}
            {props.notSignedIn ? <Link style={{fontSize:"20px", fontFamily:"TrebuchetMS",textDecoration:"none"}} to="/">Sign In</Link> : <Link style={{fontSize:"20px", fontFamily:"TrebuchetMS",textDecoration:"none"}} to="/account">Return to the Dojo</Link>}
        </div>
    )
}

export default PageNotFound