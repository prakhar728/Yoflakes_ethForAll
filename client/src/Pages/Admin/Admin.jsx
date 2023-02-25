import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../../Components/Error/Error";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";


const Admin = () => {
  const [modalTitleNumber, setmodalTitleNumber] = useState(0);
  const [details, setDetails] = useState({
    address:"",
    area:"",
    crops:[]
  })
  const [currentAddress, setcurrentAddress] = useState("0x0");
  const [instancesContract, setinstancesContract] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address, instance,signer} = useSelector((state) => state.wallet);
  useEffect(() => {
    setcurrentAddress(address);
    setinstancesContract(instance)
  }, [address,instance])

  const headings = [
    "Verify Government Official",
    "Verify the Farmer!",
    "Verify the Retail Store",
  ];
  const handleVerification = async(e) =>{
    e.preventDefault();
    var result = {};
    if(modalTitleNumber==0){
      result={
        address:details.address
      }
      console.log(result);
      console.log(instancesContract.signer);
      try {
        
        console.log("Conctract owner",await instancesContract.owner()) 
        await(await instancesContract.verifyGovernmentOfficial(details.address)).wait();
      } catch (error) {
        console.log(error);
      }
    }
    else if(modalTitleNumber==1){
      result={
        address:details.address,
        area:details.area,
        crops:details.crops
      }
      console.log(result);

    }
    else{
      result={
        address:details.address,
        area:details.area,
        crops:details.crops
      }
      console.log(result);
    }
  }
  if (address == "0x0")
    return <ErrorMessage message={"Connect to the metamask wallet"} />;
  return (
    <div id="adminWrapper">
      <div id="AdminMain">
        <div id="adminText">
          The first step towards a <span id="highLightText">secure</span> market
          place is verification.
        </div>
        <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom"  isCentered >
          <ModalOverlay backdropFilter='blur(10px)' id="modalOverlay"/>
          <ModalContent className="modal">
            <ModalHeader  className="modal">{headings[modalTitleNumber]}</ModalHeader>
            <ModalCloseButton  className="modal" />
            <ModalBody   className="modal">
              {modalTitleNumber == 0 && (
                <form>
                  <input placeholder="Enter the Officials Address" value={details.address} onChange={
                    (e)=>{
                      setDetails(details => ({
                        ...details,
                        ...{
                          address:e.target.value
                        }
                      }));
                    }
                     
                  }/>
                </form>
              )}
               {modalTitleNumber == 1 && (
                <form>
                  <input placeholder="Enter the Farmer's Address" 
                  value={details.address} onChange={
                    (e)=>{
                      setDetails(details => ({
                        ...details,
                        ...{
                          address:e.target.value,
                        }
                      }));
                    }
                     
                  }
                  />
                  <input placeholder="Enter the Farmer's Area of Farming"
                  value={details.area} onChange={
                    (e)=>{
                      setDetails(details => ({
                        ...details,
                        ...{
                          area:e.target.value
                        }
                      }));
                    }
                     
                  } />
                  <input placeholder="Enter the Farmers Crop types"
                  value={details.crops} onChange={
                    (e)=>{
                      let cropsNow  = e.target.value.split(" ");
                      setDetails(details => ({
                        ...details,
                        ...{
                          crops:cropsNow
                        }
                      }));
                    }
                  }
                  />
                </form>
              )}
               {modalTitleNumber == 2 && (
                <form>
                  <input placeholder="Enter the Retailers's Address"
                  value={details.address} onChange={
                    (e)=>{
                      setDetails(details => ({
                        ...details,
                        ...{
                          address:e.target.value
                        }
                      }));
                    }
                     
                  }
                  />
                  <input placeholder="Enter the Retailers's Area of Farming"
                  value={details.area} onChange={
                    (e)=>{
                      setDetails(details => ({
                        ...details,
                        ...{
                          area:e.target.value
                        }
                      }));
                    }
                     
                  }
                  />
                  <input placeholder="Enter the Retailers Crop Preference" 
                  value={details.crops} onChange={
                    (e)=>{
                      let cropsNow  = e.target.value.split(" ");
                      setDetails(details => ({
                        ...details,
                        ...{
                          crops:cropsNow
                        }
                      }));
                    }
                     
                  }
                  />
                </form>
              )}
            </ModalBody>
            <ModalFooter  className="modal">
              <Button onClick={handleVerification}>Verify!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="verificationBox">
          <div className="verifierName">Government Official</div>
          <button
            className="verifyButton"
            onClick={(e) => {
              onOpen();
              setmodalTitleNumber(0);
            }}
          >
            Verify
          </button>
        </div>
        <div className="verificationBox">
          <div className="verifierName">Farmer</div>
          <button
            className="verifyButton"
            onClick={(e) => {
              onOpen();
              setmodalTitleNumber(1);
            }}
          >
            Verify
          </button>
        </div>
        <div className="verificationBox">
          <div className="verifierName">Retail Store</div>
          <button
            className="verifyButton"
            onClick={(e) => {
              onOpen();
              setmodalTitleNumber(2);
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
