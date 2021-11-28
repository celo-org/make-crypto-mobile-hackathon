import { useState, useContext } from "react";
import CustomModal from "./CustomModal";
import { ethers } from "ethers";
import { VStack, Input, Text } from "@chakra-ui/react";
import { Web3Context } from "../context/Web3Context";
import { NFTMarketContext } from "../context/NFTMarketContext";
import { useHistory } from "react-router";

function SellNFTModal({ isOpen, onClose, name, collectionAddress, tokenId }) {
	const history = useHistory();
	const [price, setPrice] = useState(0);
	const [creatingMarketItem, setCreatingMarketItem] = useState(false);

	const nftMarketContext = useContext(NFTMarketContext);
	const { createMarketItemUsingSigner } = nftMarketContext;
	const web3Context = useContext(Web3Context);
	const { setOngoingTx } = web3Context;

	const handleInputChange = ({ target }) => {
		setPrice(target.value);
	};

	const handleSell = async () => {
		let priceInWei = ethers.utils.parseUnits(price, "ether");
		setCreatingMarketItem(true);
		let tx = await createMarketItemUsingSigner(
			collectionAddress,
			tokenId,
			priceInWei,
			onClose
		);
		setOngoingTx(
			`https://alfajores-blockscout.celo-testnet.org/tx/${tx.hash}`
		);
		await tx.wait();
		history.push("/");
		setCreatingMarketItem(false);
	};

	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			modalCloseButton={true}
			modalHeader={`Sell ${name}`}
			modalFooterButtonText="Sell"
			modalButtonLoadingState={creatingMarketItem}
			modalButtonOnClick={handleSell}
		>
			<VStack spacing={5} px="60px">
				<Input
					onChange={handleInputChange}
					value={price}
					size="lg"
					variant="unstyled"
					textAlign="center"
					fontSize="3xl"
					placeholder="0"
				/>
				<Text>${process.env.REACT_APP_CURRENCY_TICKER}</Text>
				<VStack>
					<Text>
						Listing Fee: 0.025 $
						{process.env.REACT_APP_CURRENCY_TICKER}
					</Text>
					<Text>
						List for {parseFloat(price) - 0.025} $
						{process.env.REACT_APP_CURRENCY_TICKER}
					</Text>
					{/* <CgArrowsExchange />  */}
				</VStack>
			</VStack>
		</CustomModal>
	);
}
export default SellNFTModal;
