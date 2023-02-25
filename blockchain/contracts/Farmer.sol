// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Farmers{

    // STATE VARIABLES DECLARATION
    
    address owner;
    mapping (uint256=>string) priceURIs;
    mapping (address=>uint256) verifiedGovernmentOfficials;
    mapping (address=>string) farmerPriceUri;
    mapping (address=>string) verifiedFarmers;
    address [] listOfFarmers;
    mapping (address=>uint256) verifiedRetailers;

    // EVENTS
    event priceUpdated(uint256 _state,address _official);
    event farmerUpdatedThePrice(address _farmer);

    constructor () {
        owner=msg.sender;  
    }
    
    // VIEW FUNCTIONS
    function checkVerifiedOfficial(address _official) public view returns(uint256){
        return verifiedGovernmentOfficials[_official];
    }

    function checkVerfiedFarmer(address _farmer) public view returns(bool){
        if(bytes(verifiedFarmers[_farmer]).length==0 )
        return true;
        return false;
    }
    function checkRetailer(address _retailer) public view returns(uint256){
        return verifiedRetailers[_retailer];
    }



    function getGovernmentPrice(uint256 _state) public view returns(string memory){
        return priceURIs[_state];
    }

    function getFarmerPrice(address _farmer) external view returns(string memory){
        return farmerPriceUri[_farmer];
    }
    function getAllFarmers() external view returns(address [] memory){
        return listOfFarmers;
    }

    // UPDATE FUNCTIONS
    function addFarmer(address _farmer,string calldata _uri) external{
        verifiedFarmers[_farmer]=_uri;
        listOfFarmers.push(_farmer);
    }
    function updateFarmerPrice(string calldata _uri) external{
        farmerPriceUri[msg.sender]=_uri;
        emit farmerUpdatedThePrice(msg.sender);
    }

    function verifyGovernmentOfficial(address _official) external{
        verifiedGovernmentOfficials[_official]=1;
    }
    function  updateGovernmentPrice(uint256 _state,string calldata _uri) external{
        priceURIs[_state]=_uri;
        emit priceUpdated(_state,msg.sender);
    }

    function verifyRetailer(address _retailer) external {
        verifiedRetailers[_retailer]=1;
    }
 
}