import React, { useEffect, useState } from "react";
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { networks } from "../../assets/networks";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAddress,
  updateSigner,
  updateInstance,
} from "../../redux/WalletSlice";
import { ethers } from "ethers";
import "./Navbar.css";
import logo from "../../assets/Logo.png";
import contractAbi from "../../assets/contractsData/Farmers.json";
import contractAddress from '../../assets/contractsData/Farmers-address.json';
const Navbar = () => {
  const [accounts, setCurrentAccount] = useState("");
  const [Network, setNetwork] = useState("");
  const [signer, setsigner] = useState(null);
  const address = useSelector((state) => state.wallet.address);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    if (!(await checkIfWalletIsConnected())) {
      console.log("Connecting wallet");
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Get MetaMask -> https://metamask.io/");
          return;
        }

        // Fancy method to request access to account.
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // Boom! This should print out public address once we authorize Metamask.
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        dispatch(updateAddress(accounts[0]));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Working!");
    }
  };

  const checkIfWalletIsConnected = async () => {
    // First make sure we have access to window.ethereum
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      dispatch(updateAddress(account));
    } else {
      console.log("No authorized account found");
      return false;
    }
    // This is the new part, we check the user's network chain ID
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId != "0x13881") await switchNetwork();
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    // Reload the page when they change networks
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
    const provider = new ethers.providers.JsonRpcProvider(ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    dispatch(updateSigner(signer));
    setsigner(signer);
    const contractInstance = new ethers.Contract(
      contractAddress.address,
      contractAbi.abi,
      signer
    );
    dispatch(updateInstance(contractInstance));
    return true;
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
                // {
                //   chainId:"0x539",
                //   chainName:"Local Host Network",
                //   rpcUrls:['http://127.0.0.1:8545/'],
                //   nativeCurrency:{
                //     name:"ETH",
                //     symbol:"ETH",
                //     decimals:18
                //   }
                // }
              ],
            });
            return;
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };
  let iC;
  const me = async() =>{
    console.log(await iC.owner());
  }
  useEffect(() => {
    try {
      if (address != "0x0") {
        const contractInstance = new ethers.Contract(
          contractAddress.address,
          contractAbi.abi,
          signer
        );
        console.log(contractInstance);
        iC=contractInstance;
        dispatch(updateInstance(contractInstance));
        me();
      }
    } catch (error) {
      console.log(error);
    }
  
  }, [address]);

  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/app/patient/records",
    },
    {
      name: "Team",
      link: "/app/patient/records",
    },
  ];

  const activeStyle = {
    borderBottom:"2px solid #217D4D"
  };
  return (
    <div className="navBarWrapper">
      <div id="navbar">
        <div id="logoWrapper">
          <img src={logo} alt="App Logo" id="logoNavbar" />
        </div>
        <div id="linkHolder">
          {routes.map((route, key) => {
            return (
              <Link
                className="navBarLinks"
                as={RouterLink}
                to={route.link}
                key={key}
                _hover={{
                  borderBottom:"2px solid #217D4D"
                }}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {route.name}
              </Link>
            );
          })}
          <div>
            {!accounts && (
              <Button
                variant="solid"
                onClick={connectWallet}
                backgroundColor="cp.4"
                _hover={{
                  background: "cp.1",
                  color: "black",
                }}
                id="connectToWalletButton"
              >
                CONNECT
              </Button>
            )}
            {accounts && (
              <Box padding={2} borderRadius={10} borderColor="grey" id="addressDisplay">
                {" "}
                Wallet: {accounts.slice(0, 6)}...{accounts.slice(-4)}{" "}
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
