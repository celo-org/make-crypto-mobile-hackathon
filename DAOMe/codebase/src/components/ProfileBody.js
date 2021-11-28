import { useContext } from "react";
import {
	VStack,
	Heading,
	HStack,
	Button,
	useDisclosure,
	Skeleton,
} from "@chakra-ui/react";
import BuyTokenModal from "./BuyTokenModal";
import { NFTContext } from "../context/NFTContext";

function ProfileBody({ royaltyEarned, name, bio, nftOwned }) {
	const { isOpen, onClose } = useDisclosure();
	const nftContext = useContext(NFTContext);
	const { withdrawingRoyalty, withdrawRoyaltyUsingSigner } = nftContext;
	return (
		<>
			<BuyTokenModal isOpen={isOpen} onClose={onClose} />
			<VStack
				marginTop="35px !important"
				spacing={5}
				width="100%"
				alignItems="center"
			>
				<Skeleton height="20px" isLoaded={name !== undefined}>
					<Heading size="md" fontWeight="700">
						{name !== undefined ? name : "username"}
					</Heading>
				</Skeleton>
				<Skeleton height="20px" isLoaded={bio !== undefined}>
					{bio !== undefined ? (
						<Heading size="sm">{bio}</Heading>
					) : (
						"user bio"
					)}
				</Skeleton>
				<HStack justifyContent="center" spacing="40px" width="100%">
					<VStack>
						<Skeleton
							isLoaded={nftOwned !== undefined}
							height="20px"
						>
							{nftOwned !== undefined ? (
								<Heading fontWeight="700" size="md">
									{nftOwned}
								</Heading>
							) : (
								"no owned nfts"
							)}
						</Skeleton>
						<Heading size="sm">NFTs Owned</Heading>
					</VStack>
					<VStack>
						<Skeleton
							isLoaded={royaltyEarned !== undefined}
							height="20px"
						>
							{royaltyEarned !== undefined ? (
								<Heading fontWeight="700" size="md">
									{royaltyEarned}
								</Heading>
							) : (
								"no royalty"
							)}
						</Skeleton>

						<Heading size="sm">Royalty Earned</Heading>
					</VStack>
					{/* <VStack>
                        <Heading size="md" fontWeight="700">20</Heading>
                        <Heading size="sm">Token Holders</Heading>
                    </VStack> */}
				</HStack>
				<HStack>
					{/* <Button size="sm" onClick={onOpen} disabled >Buy ${username}</Button> */}
					<Button disabled size="sm">
						Propose To DAO
					</Button>
					<Button
						size="sm"
						isLoading={withdrawingRoyalty}
						disabled={
							royaltyEarned === null ||
							royaltyEarned === undefined ||
							royaltyEarned === "0.0"
						}
						onClick={withdrawRoyaltyUsingSigner}
					>
						Withdraw Royalty
					</Button>
					{/* <Button disabled size="sm">Stake $DAN</Button> */}
				</HStack>
			</VStack>
		</>
	);
}

export default ProfileBody;
