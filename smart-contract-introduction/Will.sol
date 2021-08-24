// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

//Contract code
contract Will {
    //Address of the the person who owns the will
    address owner;

    //Total assets in terms of ether
    uint256 totalAssets;

    //Flag to watch if owner is deceased
    bool isDeceased;

    //Called when deploying the contract
    constructor() payable {
        //msg.sender has the address of the user deploying the contract
        owner = msg.sender;
        //msg.value has the value in ether sent by the user during deployment of contract
        totalAssets = msg.value;

        //Set initial value of flag as false
        isDeceased = false;
    }

    //Modifiers are add ons to functions
    //that allow access to call the functions
    //when certain logic is met

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorised!");
        _;
    }

    modifier mustBeDeceased() {
        require(isDeceased == true, "Owner must be deceased.");
        _;
    }

    //Store all family member's address here to send the assets
    address payable[] familyMembers;

    //A mapping of member's address and their respective assetValue
    mapping(address => uint256) assetValue;

    //Add an inheritor to the will
    function addInheritor(address payable memberAddress, uint256 assetAmount)
        public
        onlyOwner
    {
        familyMembers.push(memberAddress);
        assetValue[memberAddress] = assetAmount;
    }

    //Function to distribute the assets accordingly
    function distribute() private mustBeDeceased {
        for (uint256 i = 0; i < familyMembers.length; i++) {
            familyMembers[i].transfer(assetValue[familyMembers[i]]);
        }
    }

    //Function to declare owner as deceased
    function deceased() public onlyOwner {
        isDeceased = true;
        distribute();
    }
}
