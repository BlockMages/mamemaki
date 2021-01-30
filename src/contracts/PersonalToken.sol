// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract PersonalToken is ERC20 {

    using SafeMath for uint256;

    address public ownerAddress;

    mapping (address => bool) registerdTokenHolders;
    address[] public tokenHolders;

    string[] public urls;

    uint256 public constant totalSupplyLimit = 21000000 * 1e18;
    uint256 public distributionNum = 0;
    uint256 constant mintRate = 20;

    constructor(
        string memory _name,
        string memory _symbol,
        address _ownerAddress
    ) ERC20(_name, _symbol) {
        require(_ownerAddress != address(0));
        ownerAddress = _ownerAddress;
    }

    function _addTokenHolder(address _tokenHolder) private {
        require(_tokenHolder != address(0));
        if (registerdTokenHolders[_tokenHolder] == false) {
            tokenHolders.push(_tokenHolder);
            registerdTokenHolders[_tokenHolder] = true;
        }
    }

    function getTokenHolders() external view returns (address[] memory) {
        uint256 tokenHoldersCount = tokenHolders.length;
        address[] memory tokenHoldersMemory = new address[](tokenHoldersCount);
        tokenHoldersMemory = tokenHolders;
        return tokenHoldersMemory;
    }

    function _getMintAmount() private view returns (uint256) {
        uint256 remainingReserve = totalSupplyLimit.sub(totalSupply());
        return remainingReserve.mul(mintRate).div(100);
    }

    function _additionalMint() private returns (uint256) {
        uint256 mintAmount = _getMintAmount();
        _mint(msg.sender, mintAmount);
        return mintAmount;
    }

    // TODO 一定期間発行できないようにする
    function distribute(address[] memory _addressList) external {
        require(msg.sender == ownerAddress, "Only owner can distribute tokens.");
        uint256 mintedAmount = _additionalMint();

        uint256 distributionAmountPerPerson = mintedAmount.div(_addressList.length);

        for(uint256 i = 0; i < _addressList.length; i++) {
            if (transfer(_addressList[i], distributionAmountPerPerson) == false) {
                revert("Token transfer failed.");
            }
        }

        distributionNum++;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        _addTokenHolder(recipient);
        return true;
    }

    function addUrl(string memory _url) public returns(uint) {
        urls.push(_url);
        uint count = urls.length;
        return count;
    }
}
