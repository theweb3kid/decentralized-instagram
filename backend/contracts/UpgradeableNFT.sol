// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract UpgradeableNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFT NYC", "NFTNYC") {}

    mapping(address => bool) userAlreadyHasNFT;

    function mint() public returns(uint) {
        require(userAlreadyHasNFT[msg.sender] == false, "Only One NFT Allowed Per Wallet");

        uint256 newUpgradeableNFTID = _tokenIds.current();

        _safeMint(msg.sender, newUpgradeableNFTID);
        _setTokenURI(newUpgradeableNFTID, string(abi.encodePacked("https://api.nftnyc/metadeta",'/',Strings.toHexString(uint256(uint160(msg.sender)), 20))));
        userAlreadyHasNFT[msg.sender] = true;
        _tokenIds.increment();

        return(_tokenIds.current() - 1);
    }

    function transferFrom(address from, address to, uint256 tokenId)
        public override(ERC721)
    {
        require(true == false, "NFT Is Soulbound");
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId)
        public override(ERC721)
    {
        require(true == false, "NFT Is Soulbound");
        super.safeTransferFrom(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function updateTokenURI(uint _tokenId, string memory _tokenURI) public {
        _setTokenURI(_tokenId, _tokenURI);
    }

}
      