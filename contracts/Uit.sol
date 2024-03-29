pragma solidity ^0.6.1;
pragma experimental ABIEncoderV2;

import "./Diploma.sol";
import "./SignVerifer.sol";

contract Uit {
    
    
    struct Student {
        string first_name;
        string last_name;
        uint256 birthday;
    }
    
    struct Dean {
        string first_name;
        string last_name;
        address dean_address;
    }
    
    struct SignDiploma {
        Diploma dipoma;
        bytes signOfDean;
    }
    mapping(address => Student) private _students;
    mapping(address => Diploma) private _diplomas;
    mapping(address => mapping(address => SignDiploma)) _dips;
    
    Dean private _dean;
    address private _owner;
    
    event Graduate(address indexed _student, address indexed _diploma);
    
    constructor(string memory _dean_first_name, string memory _dean_last_name) public {
        _owner = msg.sender;
        _dean.first_name = _dean_first_name;
        _dean.last_name = _dean_last_name;
        _dean.dean_address = msg.sender;
    }
    
    function getDean() public view returns(Dean memory) {
        return _dean;
    }
    
    modifier onlyOwner() {
        require( _owner == msg.sender);
        _;
    }
    
    modifier validAddress(address his_address){
        require(his_address != address(0));
        _;
    }
    
    function addStudent(address his_address, string memory _first_name, string memory _last_name, uint256 _birthday) public onlyOwner validAddress(his_address){
        _students[his_address] = Student(_first_name, _last_name, _birthday);
        
    }
    
    function getStudent(address his_address) public validAddress(his_address) view returns(Student memory) {
        return _students[his_address];
    }
    
    function registerDiploma(string memory title, string memory university, address student, string memory montion, bytes32 hash, bytes memory signature) public onlyOwner validAddress(student)  {
        Diploma diploma = new Diploma(title, university, student, _owner, montion, hash);
        _diplomas[address(diploma)] = diploma;
        _dips[student][address(diploma)] = SignDiploma(diploma, signature);
        emit Graduate(student, address(diploma));
    }
    
    
    function getDiploma(address _diploma) public validAddress(_diploma) view returns(Student memory _student, string memory _title, string memory _university, uint256 _date, string memory _mention, bytes32 _hash, bytes memory _signature){
        require(address(_diplomas[_diploma]) != address(0));
        Diploma diploma = _diplomas[_diploma];
        _student = _students[diploma.getStudent()];
        _title = diploma.getTitle();
        _university = diploma.getUniversity();
        _date = diploma.getDate();
        _mention = diploma.getMention();
        _hash = diploma.fingerPrint();
        require(_dips[diploma.getStudent()][_diploma].signOfDean.length != 0);
        _signature = _dips[diploma.getStudent()][_diploma].signOfDean;
    }
    
    function getDiplomaOfStudent(address _student, address _diploma) public view returns(SignDiploma memory){
        require(address(_dips[_student][_diploma].dipoma) == _diploma);
        return _dips[_student][_diploma];
    }
    
}