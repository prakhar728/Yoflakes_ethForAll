import React from 'react'
import ErrorImg from "../../assets/Error.svg";
import "./Error.css";
import {useNavigate} from "react-router-dom";
const Error = ({message}) => {
  const navigate = useNavigate();
    console.log(message);
  return (
    <div className='errorWrapper'>
      <div className='mainError'>
        <img src={ErrorImg} id="errorImage" />
        <div id="errorMessage">{message && message}</div>
        <div id="errorButtonWrapper"><button  
        id="errorButton"
        onClick={(e)=>{
          e.preventDefault();
          navigate("/");
        }}>Back to Home Page</button></div>
      </div>
      </div>
  )
}

export default Error