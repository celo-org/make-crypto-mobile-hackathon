import { VStack } from "@chakra-ui/react";
import Post from "../components/Post";
// import Comment from "../components/Comment";
// import Bid from "../components/Bid";
// import BidHeader from "../components/BidHeader";
import { useEffect, useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { useParams } from "react-router-dom";
import { NFTContext } from "../context/NFTContext";
import { CreatorsContext } from "../context/CreatorsContext";
import { NFTMarketContext } from "../context/NFTMarketContext";

function PostPage() {
	const { creatoraddress, address, itemid, id } = useParams();

	const web3Context = useContext(Web3Context);
	const nftContext = useContext(NFTContext);
	const creatorsContext = useContext(CreatorsContext);
	const nftMarketContext = useContext(NFTMarketContext);
	const [nft, setNFT] = useState(null);
	useEffect(() => {
		const { provider, account } = web3Context;
		const { nftMetadataUsingSigner } = nftContext;
		const { getMarketItemByIdUsingSigner } = nftMarketContext;
		(async () => {
			if (provider != null && account != null) {
				if (id != null) {
					let nft = await nftMetadataUsingSigner(
						creatoraddress,
						address,
						id
					);
					setNFT(nft);
				} else {
					let nft = await getMarketItemByIdUsingSigner(itemid);
					setNFT(nft);
				}
			}
		})();
	}, [address, creatoraddress, id]);

	return (
		<VStack spacing={0} alignItems="center" width="100%">
			<Post
				nft={nft}
				id={id !== undefined ? id : itemid}
				isExpanded={false}
			/>
		</VStack>
	);
}

export default PostPage;
