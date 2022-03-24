# Fractional contracts

This is a simple FNFT project.

## Settings
This is a generic settings contract to be owned by governance. It is gated by some high and low boundary values. It allows for governance to set parameters for all Token Vaults.

## Vault Factory
This is a simple factory where a user can call `mint` to create a new vault with the token that they want to fractionalize. The user must pass in:
- an ERC20 token desired name
- an ERC20 token desired symbol
- the ERC721 token address they wish to fractionalize
- the ERC721 token id they wish to fractionalize
- the desired ERC20 token supply
- the initial listing price of the NFT
- their desired curator fee

## Initialized Proxy
A minimal proxy contract to represent vaults which allows for cheap deployments.

## Token Vault
The token vault is the smart contract which holds the logic for NFTs that have been fractionalized.

Token owners are able to update the reserve price with a weighted average of all token owners reserve prices. This is done automatically on token transfer to new accounts or manually through `updateUserPrice`.

Alongside this logic, is auction logic which allows for an outside user to initial a buyout auction of the NFT. Here there are `start`, `bid`, `end` and `cash` functions.
#### Start
The function called to kick off an auction. `msg.value` must be greater than or equal to the current reserve price.
#### Bid
The function called for all subsequent auction bids.
#### End
The function called when the auction timer is up and ended.
#### Cash
The function called for token owners to cash out their share of the ETH used to purchase the underlying NFT.

There is also some admin logic for the `curator` (user who initially deposited the NFT). They can reduce their fee or change the auction length. Alongside this, they are able to claim fees in the form of token supply inflation.

## IndexERC721
This is a single token ERC721 which is used to custody multiple ERC721 tokens. 
#### depositERC721
Anyone can deposit an ERC721 token into the contract
#### withdrawERC721
The token owner can withdraw any ERC721 tokens in the contract
#### withdrawETH
The token owner can withdraw any ETH in the contract
#### withdrawERC20
The token owner can withdraw any ERC20 token in the contract

## Compile, Deploy and Test

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

