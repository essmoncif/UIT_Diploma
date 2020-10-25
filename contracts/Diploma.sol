pragma solidity ^0.6.1;

contract Diploma {
    
    
    
    string private _title;
    string private _university;
    string private _montion;
    uint256 private _date;
    address private _student;
    address private _dean;
    bytes32 private _hash;
    
    
    constructor(string memory title, string memory university, address student, address dean, string memory montion, bytes32 hash) public {
        _title = title;
        _university = university;
        _student = student;
        _dean = dean;
        _date = now;
        _montion = montion;
        _hash = hash;
    }
    
     function getDate() public view returns(uint256){
        return _date;
    }
    
    function fingerPrint() public view returns (bytes32) {
        return _hash;
    }
    
    function getStudent() public view returns(address) {
        return _student;
    }
    
    function getTitle() public view returns(string memory){
        return _title;
    }
    
    function getUniversity() public view returns(string memory) {
        return _university;
    }
    
    function getMention() public view returns(string memory) {
        return _montion;
    }
    
    
}

