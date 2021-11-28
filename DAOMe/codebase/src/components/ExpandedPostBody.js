import { VStack, Button, Text, Grid, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { NFTMarketContext } from "../context/NFTMarketContext";
import SellNFTModal from "./SellNFTModal";
import { useDisclosure } from "@chakra-ui/react";

function ExpandedPostBody({
	owner,
	bio,
	collectionAddress,
	seller,
	isApprovedByOwner,
	tokenId,
	name,
	price,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const web3Context = useContext(Web3Context);
	const { account } = web3Context;

	const nftMarketContext = useContext(NFTMarketContext);
	const { approveToMarketplaceUsingSigner, approvingToMarketplace } =
		nftMarketContext;

	return (
		<VStack
			borderBottom="1px solid"
			borderColor="brand.200"
			width="100%"
			justifyContent="space-between"
			py={2}
		>
			<SellNFTModal
				collectionAddress={collectionAddress}
				tokenId={tokenId}
				name={name}
				onClose={onClose}
				isOpen={isOpen}
			/>
			<VStack px={4} alignItems="flex-start" width="100%">
				<Text fontSize="sm" noOfLines="3">
					{bio}
				</Text>
			</VStack>
			{owner !== process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF &&
			owner.toLowerCase() !== account.toLowerCase() ? null : (
				<Grid
					borderTop="1px solid"
					py={2}
					px={4}
					borderColor="brand.200"
					templateColumns="repeat(2, 1fr)"
					width="100%"
				>
					{owner !==
						process.env.REACT_APP_MARKETPLACE_CONTRACT_REEF &&
					owner.toLowerCase() === account.toLowerCase() ? (
						isApprovedByOwner === true ? (
							<Button
								onClick={onOpen}
								gridColumn="1/ span 2"
								width="100%"
							>
								Sell
							</Button>
						) : (
							<Button
								isLoading={approvingToMarketplace}
								onClick={() =>
									approveToMarketplaceUsingSigner(
										collectionAddress,
										tokenId
									)
								}
								gridColumn="1/ span 2"
								width="100%"
							>
								Approve
							</Button>
						)
					) : (
						<>
							<VStack
								spacing={0}
								alignItems="flex-start"
								justifyContent="center"
							>
								<Text>Price</Text>
								<Heading size="sm" fontWeight="700">
									{price} Velas
								</Heading>
							</VStack>
							<Button height="100%" size="md">
								Buy
							</Button>
						</>
					)}
				</Grid>
			)}
		</VStack>
	);
}

export default ExpandedPostBody;
