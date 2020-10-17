pragma solidity ^0.6.1;

enum Mention {
    passable,
    assez_bien,
    bien,
    tres_bien
}

contract Diploma {
    
    
    
    string private _title;
    string private _university;
    Mention private _montion;
    uint256 private _date;
    address private _student;
    address private _dean;
    bytes32 private _hash;
    
    
    constructor(string memory title, string memory university, address student, address dean, Mention montion, bytes32 hash) public {
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
    
}

