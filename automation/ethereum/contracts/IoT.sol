pragma solidity ^0.4.25;

contract IotContract {
    struct iotData{
        //structure of IoT data to store
        string ipfsHash;
        uint256 time;
    }
    
    iotData[] iotDataArray;
    
    function setIotData(string ipfsHash,uint256 time) public {
        iotData memory newData = iotData(ipfsHash,time);
        iotDataArray.push(newData);
    } 
    
    function getIotDataArrayLength () public view returns (uint256) {
        return iotDataArray.length;
    }
    
    function getIotDataByIndex(uint256 index) public view returns (string,uint256){
        return (iotDataArray[index].ipfsHash,iotDataArray[index].time);
    }
    
}