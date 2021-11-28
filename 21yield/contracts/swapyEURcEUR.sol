
// SPDX-License-Identifier: MIT


/// @title Swap contract for YEUR/CEUR
/// @author Mael KREJCI
pragma solidity ^0.8.2;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract SwapYEURCEUR {
    // Swaps YEUR/CEUR for single path swaps

    ISwapRouter public immutable swapRouter;

    address public YEUR = 0x84A5d2f6163B2eb4164002Dee985f6ACDC93638e;  // Alfajores Testnet
    address public CEUR = 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F;  // Alfajores Testnet

    // For this example, we will set the pool fee to 0.3%.    
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    /// @notice swapExactInputSingle swaps a fixed amount of YEUR for a maximum possible amount of CEUR   
    /// using the YEUR/CEUR 0.3% pool by calling `exactInputSingle` in the swap router.    
    /// @dev The calling address must approve this contract to spend at least `amountIn` worth of its YEUR for this function to succeed.    
    /// @param amountIn The exact amount of YEUR that will be swapped for CEUR.    
    /// @return amountOut The amount of CEUR received.    
    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {        
        // msg.sender must approve this contract
        // Transfer the specified amount of YEUR to this contract.        
        TransferHelper.safeTransferFrom(YEUR, msg.sender, address(this), amountIn);
        // Approve the router to spend YEUR.        
        TransferHelper.safeApprove(YEUR, address(swapRouter), amountIn);
        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.        
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.        
        ISwapRouter.ExactInputSingleParams memory params =            
            ISwapRouter.ExactInputSingleParams({
                tokenIn: YEUR,
                tokenOut: CEUR,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        // The call to `exactInputSingle` executes the swap.        
        amountOut = swapRouter.exactInputSingle(params);    
    }

}