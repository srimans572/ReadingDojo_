import React from "react"
import "../styles/decor.css"
import { Link } from "react-router-dom"
const Decor = () => {
        return(
            <div className="decorContainer">
                <div className="decorContainer_">
                    <img className = "logo" src={require("./logo.png")}/>
                </div>
                <div className="info">
                    - Reading Comprehension Made Easy With AI -
                </div>
                <div className="footer">
                    <Link to="/privacy-policy"className ="footerlink">Privacy Policy</Link>
                </div>
            </div>
        )
}
export default Decor