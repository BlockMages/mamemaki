// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./PersonalToken.sol";

contract TokenFactory {
    address[] public tokens;
    mapping (address => address) public ownerToTokens;

    function createToken(string memory _name, string memory _symbol) public returns (address) {
        address _ownerAddress = msg.sender;
        address _tokenAddress;

        IERC20 token = new PersonalToken(_name, _symbol, _ownerAddress);
        _tokenAddress = address(token);
        tokens.push(_tokenAddress);
        ownerToTokens[_ownerAddress] = _tokenAddress;

        return _tokenAddress;
    }

    function getTokenCount() public view returns (uint256) {
        return tokens.length;
    }
}
