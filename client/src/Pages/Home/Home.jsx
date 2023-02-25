import React from "react";
import "./Home.css";
import wallet from "../../assets/wallet.svg"
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="HomeWrapper">
      <div id="allLeftWrap">
        <div id="textAreaHome">
          <div id="upperText">
            <span id="highLightText">Revolutionizing</span> the food supply chain for a better
            tomorrow.
          </div>
          <div id="lowerText">
            We plan to bridge the gap between the farmers and the consumers by
            eliminating the middleman and serving more justice to both the ends.
          </div>
        </div>
        <div id="homePageButtonWrapper">
          <button className="homeButtons" >Connect <img src={wallet} id="walletIcon"/></button>
          <button className="homeButtons" onClick={(e)=>{
            e.preventDefault();
            navigate("/admin")
          }}>Read More</button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
