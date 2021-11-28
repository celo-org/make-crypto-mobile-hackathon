import {
	Grid,
	HStack,
	VStack,
	Heading,
	Spinner,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Image,
	Box,
	useColorModeValue,
	Icon,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { useEffect } from "react";
import CustomTab from "../components/CustomTab";
import ProfileBody from "../components/ProfileBody";
import ProfileHeader from "../components/ProfileHeader";
import { CreatorsContext } from "../context/CreatorsContext";
import { NFTContext } from "../context/NFTContext";
import { NFTMarketContext } from "../context/NFTMarketContext";

function ProfilePage() {
	const creatorsContext = useContext(CreatorsContext);
	const { creator, creatorAddress } = creatorsContext;
	const { username, name, bio, profilePicUrl, royaltyEarned } = creator;

	const nftContext = useContext(NFTContext);
	const { loadingNFT, currentUserNFTs } = nftContext;

	const nftMarketContext = useContext(NFTMarketContext);
	const { currentUserNFTOnMarketplace, currentUserNFTsBoughtOnMarketplace } =
		nftMarketContext;

	const [userOwnedNFT, setUserOwnedNFT] = useState(null);
	const bg = useColorModeValue("brand.100", "brand.700");

	useEffect(() => {
		const { getNFTsOwnerByUserUsingSigner } = nftContext;
		const { fetchListedItemsUsingSigner, fetchMyNFTsUsingSigner } =
			nftMarketContext;
		if (creatorAddress != null && creator != null) {
			getNFTsOwnerByUserUsingSigner();
			fetchListedItemsUsingSigner();
			fetchMyNFTsUsingSigner();
		}
	}, [creatorAddress]);

	useEffect(() => {
		if (
			currentUserNFTs !== null &&
			currentUserNFTsBoughtOnMarketplace !== null
		) {
			setUserOwnedNFT([
				...currentUserNFTs,
				...currentUserNFTsBoughtOnMarketplace,
			]);
		}
	}, [currentUserNFTs, currentUserNFTsBoughtOnMarketplace]);
	return (
		<VStack width="100%" padding={0}>
			<ProfileHeader username={username} profilePicUrl={profilePicUrl} />
			<ProfileBody
				nftOwned={
					userOwnedNFT && currentUserNFTOnMarketplace
						? userOwnedNFT.length +
						  currentUserNFTOnMarketplace.length
						: undefined
				}
				username={username}
				bio={bio}
				name={name}
				royaltyEarned={royaltyEarned}
			/>
			{creator !== null ? (
				<>
					<HStack justifyContent="center" width="100%">
						{loadingNFT === false &&
						currentUserNFTs !== null &&
						currentUserNFTOnMarketplace !== null &&
						userOwnedNFT !== null ? (
							<Tabs isFitted width="100%">
								<TabList
									margin={4}
									boxSizing="border-box"
									padding={2}
									borderRadius={4}
									background={bg}
									overflowX="scroll"
									width="100% - calc(2rem)"
									border={0}
								>
									<CustomTab
										icon={<MdOutlineSell />}
										number={userOwnedNFT.length}
										tabTitle="Owned"
									/>
									<CustomTab
										icon={<BiUser />}
										number={
											currentUserNFTOnMarketplace.length
										}
										tabTitle="Listed"
									/>
								</TabList>
								<TabPanels>
									<TabPanel padding={0}>
										{currentUserNFTs !== null ||
										currentUserNFTsBoughtOnMarketplace !==
											null ? (
											userOwnedNFT.length !== 0 ? (
												<Grid
													overflowY="scroll"
													gridGap="1px"
													templateColumns="repeat(3, 1fr)"
												>
													{userOwnedNFT.map(
														(nft, index) => {
															let toUrl = `/nft/${nft.creatorAddress}/${nft.collectionAddress}/${nft.tokenId}`;
															return (
																<Link
																	key={index}
																	to={toUrl}
																>
																	<Image
																		key={
																			nft.tokenId
																		}
																		src={
																			nft.image
																		}
																	/>
																</Link>
															);
														}
													)}
												</Grid>
											) : (
												<Box
													w="100% - calc(5rem)"
													h="100%"
													background={bg}
													mx={5}
													borderRadius={4}
													padding={5}
												>
													<VStack spacing={5}>
														<Icon
															w="40px"
															h="40px"
															as={
																HiOutlineEmojiSad
															}
														/>
														<Heading size="sm">
															No Owned NFTs
														</Heading>
													</VStack>
												</Box>
											)
										) : (
											<Spinner />
										)}
									</TabPanel>
									<TabPanel padding={0}>
										{currentUserNFTOnMarketplace !==
										null ? (
											currentUserNFTOnMarketplace.length !==
											0 ? (
												<Grid
													overflowY="scroll"
													gridGap="1px"
													templateColumns="repeat(3, 1fr)"
												>
													{currentUserNFTOnMarketplace.map(
														(nft, index) => {
															let toUrl = `/nft/marketplace/${nft.creatorAddress}/${nft.collectionAddress}/${nft.tokenId}`;
															return (
																<Link
																	key={index}
																	to={toUrl}
																>
																	<Image
																		key={
																			nft.tokenId
																		}
																		src={
																			nft.image
																		}
																	/>
																</Link>
															);
														}
													)}
												</Grid>
											) : (
												<Box
													w="100% - calc(5rem)"
													h="100%"
													background={bg}
													mx={5}
													borderRadius={4}
													padding={5}
												>
													<VStack spacing={5}>
														<Icon
															w="40px"
															h="40px"
															as={
																HiOutlineEmojiSad
															}
														/>
														<Heading size="sm">
															No Listed NFTs
														</Heading>
													</VStack>
												</Box>
											)
										) : (
											<Spinner />
										)}
									</TabPanel>
								</TabPanels>
							</Tabs>
						) : (
							<Spinner />
						)}
					</HStack>
				</>
			) : (
				<Spinner />
			)}
		</VStack>
	);
}
export default ProfilePage;
