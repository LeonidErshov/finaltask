// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;

    event PaymentReceived(address indexed sender, uint256 amount);
    event PaymentSent(address indexed recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    
    function withdraw(uint256 amount, address payable recipient) external {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(address(this).balance >= amount, "Insufficient balance");

        recipient.transfer(amount);
        emit PaymentSent(recipient, amount);
    }

    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}