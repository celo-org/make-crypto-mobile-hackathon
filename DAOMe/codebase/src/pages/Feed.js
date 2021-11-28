import { useContext } from "react";
import Post from "./../components/Post";
import { VStack, Spinner, Heading } from "@chakra-ui/react";
import { Web3Context } from "../context/Web3Context";
import { useEffect } from "react";
import { NFTMarketContext } from "../context/NFTMarketContext";

function Feed() {
	const nftMarketContext = useContext(NFTMarketContext);
	const { fetchingMarketItems, marketItems } = nftMarketContext;

	useEffect(() => {
		const { fetchMarketItemsUsingSigner } = nftMarketContext;
		fetchMarketItemsUsingSigner();
	}, []);
	return (
		<VStack width="100%" alignItems="center">
			{fetchingMarketItems === true ? (
				<Spinner />
			) : marketItems !== null ? (
				marketItems.length !== 0 ? (
					<>
						{marketItems.map((item) => {
							return (
								<Post
									nft={item}
									id={item.tokenId}
									isExpanded={false}
								/>
							);
						})}
					</>
				) : (
					<Heading paddingTop={4} size="md">
						No Items listed
					</Heading>
				)
			) : (
				<Heading paddingTop={4} size="md">
					No Items listed
				</Heading>
			)}
		</VStack>
	);
}

export default Feed;
