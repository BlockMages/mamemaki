// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./Token.sol";

contract TokenFactory {
    address[] public tokens;

    function createToken(string memory _name, string memory _symbol) public returns (address) {
        IToken token = new Token(_name, _symbol, msg.sender);
        tokens.push(address(token));

        return address(token);
    }

    function getTokenCount() public view returns (uint256) {
        return tokens.length;
    }
}
