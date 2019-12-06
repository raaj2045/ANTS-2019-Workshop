pragma solidity ^0.4.25;

contract IOT {
    struct iotData{
        //structure of IoT data to store
        string temperature;
        string humidity;
        uint256 time;
    }
    
    iotData[] iotDataArray;
    
    function setIotData(string temperature,string humidity,uint256 time) public {
        iotData memory newData = iotData(temperature,humidity,time);
        iotDataArray.push(newData);
    } 
    
    function getIotDataArrayLength () public view returns (uint256) {
        return iotDataArray.length;
    }
    
    function getIotDataByIndex(uint256 index) public view returns (string,string,uint256){
        return (iotDataArray[index].temperature,iotDataArray[index].humidity,iotDataArray[index].time);
    }
    
}