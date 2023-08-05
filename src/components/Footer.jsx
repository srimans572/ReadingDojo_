import React, { useState,} from 'react';
import { Link } from 'react-router-dom';
 
const Footer = () => 
{
    return(
    <div style={{backgroundColor:"#5440ec", marginTop:"20px", padding:"10px"}}>
        <div style={{display:"flex", justifyContent:"space-evenly", }}>
           <Link to="/privacy-policy"><p style={{color:"white",textAlign:"center", fontSize:"15px", textDecoration:"none", textDecorationLine:"none"}}>Privacy Policy</p></Link>
        </div>
        <p style={{color:"white", textAlign:"center", fontSize:"15px"}}>©2023 Reading Dojo</p>
        </div>
    )
}

export default Footer