const Uit = artifacts.require("Uit");
const Web3 = require('web3');

const _web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));


contract("Uit", (accounts) => {
    var uitInstance;
    const deanAddress = accounts[0];
    const student = accounts[1];

    it("Initialization uit contract", ()=>{
        return Uit.deployed().then((instance) => {
            uitInstance = instance;
            return uitInstance.address;
        }).then((address) => {
            assert.notEqual(address, "0x0", "Address of contract must to be not null");
            return uitInstance.getDean();
        }).then((dean) => {
            assert.equal(dean.first_name, "moncif");
            assert.equal(dean.last_name, "essaoudi");
        })
    })

    it("student data", ()=> {
        return Uit.deployed().then((instance) => {
            uitInstance = instance;
            const birthday = new Date(1997, 7, 7);
            return uitInstance.addStudent(student, "anass", "azour", birthday.getTime(), {from: deanAddress});
        }).then((receipt) => {
            return uitInstance.getStudent.call(student, {from: deanAddress});
        }).then((data)=> {
            assert.equal(data.first_name, "anass");
            assert.equal(data.last_name, "azour");
            const birthday = new Date(1997, 7, 7);
            assert.equal(data.birthday, birthday.getTime());
            /*
            Trying to get unexisting student 
            */
            return uitInstance.getStudent.call(accounts[2]);
        }).then((receipt)=> {
            assert.equal(receipt.first_name, '');
            assert.equal(receipt.last_name, '');
            assert.equal(receipt.birthday, 0);
            /*
            Trying to insert student data indexed with 0x0 address
            */
           return uitInstance.addStudent.call(0x0, "omar", "elroussi", {from: deanAddress});
        }).then(assert.fail).catch((err) => {
            assert.equal(err.reason, "invalid address");
        })
    })

    it("New Diploma", async ()=> {
        
        uitInstance = await Uit.deployed();
        const diploma = {
            title: "software engineering for cloud computing",
            university: "Ibn Tofail",
            student: student,
            dean: deanAddress,
            montion: 2
        }
        const metadata = JSON.stringify(diploma);
        const hash = _web3.utils.sha3(metadata);
        const signature = await _web3.eth.sign(hash, deanAddress);
        try {
            const result = await uitInstance.registerDiploma.call(diploma.title, diploma.university, diploma.student, diploma.montion, hash, signature, {from: deanAddress});
            assert.notEqual(result, "0x0", "New diploma contract address must be not null");
        } catch (error) {
            assert.fail(error);
        }
        
        try {
            const result = await uitInstance.registerDiploma(diploma.title, diploma.university, diploma.student, diploma.montion, hash, signature, {from: deanAddress});
            assert.equal(result.logs.length, 1);
            assert.equal(result.logs[0].event, 'Graduate');
            assert.equal(result.logs[0].args._student, student);
            assert.notEqual(result.logs[0].args._diploma, "0x0");
        } catch (error) {
            assert.fail(error);
        }
        

    })
})