// TODO ライセンスを記載する
// SPDX-License-Identifier: 
pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract PersonalToken is ERC20 {
    
    using SafeMath for uint256;
    
    address ownerAddress;
    
    // TODO ERC20の引数（name, symbol）を設定可能にする
    constructor() ERC20("VTuber1", "VTBR1") {
        ownerAddress = msg.sender;
    }
    
    function _additionalMint() private returns (uint256) {
        // TODO 発行量を計算で算出する
        uint256 mintedAmount = 100;
        _mint(msg.sender, mintedAmount);
        return mintedAmount;
    }
    
    function distribute(address[] memory _addressList) public {
        require(msg.sender == ownerAddress, "Only owner can distribute tokens.");
        uint256 mintedAmount = _additionalMint();
        // uint256 mintedAmount = 100;
        
        uint256 distributionAmountPerPerson = mintedAmount.div(_addressList.length);
        
        for(uint256 i = 0; i < _addressList.length; i++) {
            if (transfer(_addressList[i], distributionAmountPerPerson) == false) {
                revert("Token transfer failed.");
            }
        }
    }
}