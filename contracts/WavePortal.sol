// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    Wave[] waves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver; // Endereço do usuário que deu tchauzinho
        string message; // Mensagem que o usuário envio
        uint256 timestamp; // Data/hora de quando o usuário tchauzinhou.
    }


    constructor() payable{
        console.log("eu fui deployado !!!");
    }

    function wave(string memory _message) public{
        totalWaves += 1;
        console.log("%s deu tchauzinho!", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;

        require( prizeAmount <= address(this).balance, "Tentando sacar mais dinheiro que o contrato possui.");

        (bool success, ) = (msg.sender).call{value: prizeAmount}("");

        require(success, "Falhou em sacar dinheiro do contrato.");
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        console.log("Temos um total de %d tchauzinhos!", totalWaves);

        return totalWaves;
    }
}