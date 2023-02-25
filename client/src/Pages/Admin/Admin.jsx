import React, { useEffect } from "react";
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../../Components/Error/Error";
const Admin = () => {
  const { address, instance } = useSelector((state) => state.wallet);
  useEffect(() => {
    console.log("Loaded?");
  }, []);
  useEffect(() => {
    console.log(instance);
  }, []);

  if (address == "0x0")
    return <ErrorMessage message={"Connect to the metamask wallet"} />;
  return (
    <div id="adminWrapper">
      <div id="AdminMain">
        <div id="adminText">
          The first step towards a <span id="highLightText">secure</span> market
          place is verification.
        </div>
        <div className="verificationBox">
          <div className="verifierName">Government Official</div>
          <button className="verifyButton">Verify</button>
        </div>
        <div className="verificationBox">
          <div className="verifierName">Farmer</div>
          <button className="verifyButton">Verify</button>
        </div>
        <div className="verificationBox">
          <div className="verifierName">Retail Store</div>
          <button className="verifyButton">Verify</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
