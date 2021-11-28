import {
	VStack,
	Button,
	Text,
	Heading,
	Grid,
	Spinner,
	Link,
	useDisclosure,
	Skeleton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { NFTMarketContext } from "../context/NFTMarketContext";
import { NFTContext } from "../context/NFTContext";

import SellNFTModal from "./SellNFTModal";
import { ethers } from "ethers";
import { FiExternalLink } from "react-icons/fi";

function PostBody({
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

	const nftContext = useContext(NFTContext);
	const { approveToMarketplaceUsingSigner, approvingToMarketplace } =
		nftContext;

	const nftMarketContext = useContext(NFTMarketContext);
	const { creatingMarketSale, createSaleUsingSigner } = nftMarketContext;
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
				<Skeleton isLoaded={name !== undefined}>
					{name === undefined ? (
						"no name"
					) : (
						<Heading size="md">{name}</Heading>
					)}
				</Skeleton>
				<Skeleton isLoaded={bio !== undefined}>
					{bio === undefined ? (
						"lorem askansd asdkas akslndejnkjnaa aksdnawkjrnq asknakjd klsm"
					) : (
						<Text fontSize="sm" noOfLines="3">
							{bio}
						</Text>
					)}
				</Skeleton>
			</VStack>
			{account !== null && owner !== undefined ? (
				owner !== process.env.REACT_APP_MARKETPLACE_ADDRESS &&
				owner.toLowerCase() !== account.toLowerCase() ? null : (
					<Grid
						borderTop="1px solid"
						py={2}
						px={4}
						borderColor="brand.200"
						templateColumns="repeat(2, 1fr)"
						width="100%"
						gridGap={2}
					>
						{owner !== process.env.REACT_APP_MARKETPLACE_ADDRESS &&
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
								{seller !== null && price !== null ? (
									<>
										<VStack
											spacing={0}
											alignItems="flex-start"
											justifyContent="center"
										>
											<Text>Price</Text>
											<Heading size="sm" fontWeight="700">
												{price} $
												{
													process.env
														.REACT_APP_CURRENCY_TICKER
												}
											</Heading>
										</VStack>
										{account.toLowerCase() ===
										seller.toLowerCase() ? null : (
											<Button
												isLoading={creatingMarketSale}
												onClick={() =>
													createSaleUsingSigner(
														collectionAddress,
														tokenId,
														ethers.utils.parseUnits(
															price,
															"ether"
														)
													)
												}
												height="100%"
												size="md"
											>
												Buy
											</Button>
										)}
									</>
								) : null}
							</>
						)}
						<Link
							href={`${process.env.REACT_APP_EXPLORER_URL}/token/${collectionAddress}/instance/${tokenId}/token-transfers`}
							gridColumn="1/ span 2"
							textDecoration="none"
							target="_blank"
							_hover={{ textDecoration: "none" }}
							_active={{ textDecoration: "none" }}
							_focus={{ textDecoration: "none" }}
						>
							<Button width="100%" colorScheme="pink">
								<span style={{ marginRight: "5px" }}>
									View On Explorer
								</span>
								<FiExternalLink />
							</Button>
						</Link>
					</Grid>
				)
			) : (
				<Spinner />
			)}
		</VStack>
	);
}

export default PostBody;
