import { VStack, Image, Skeleton } from "@chakra-ui/react";
import ExpandedPostBody from "./ExpandedPostBody";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

function Post({ isExpanded, nft, id }) {
	return (
		<VStack width="100%">
			<PostHeader
				owner={nft ? nft.owner : undefined}
				profilePicUrl={nft ? nft.creator.profilePicUrl : undefined}
				name={nft ? nft.creator.name : undefined}
			/>
			<Skeleton
				isLoaded={nft !== null}
				width="100%"
				height="100%"
				mt="0 !important"
			>
				{nft === null ? (
					<Image
						height="100%"
						width="100%"
						src="https://www.bhaktiphotos.com/wp-content/uploads/2018/04/Mahadev-Bhagwan-Photo-for-Devotee.jpg"
					/>
				) : (
					<Image
						marginTop="0px !important"
						width="100%"
						height="100%"
						src={nft ? nft.image : undefined}
					/>
				)}
			</Skeleton>
			{isExpanded ? (
				<ExpandedPostBody
					name={nft ? nft.name : undefined}
					tokenId={id}
					isApprovedByOwner={nft ? nft.isApprovedByOwner : undefined}
					seller={nft ? nft.seller : undefined}
					collectionAddress={nft ? nft.collectionAddress : undefined}
					owner={nft ? nft.owner : undefined}
					price={nft ? nft.price : undefined}
					bio={nft ? nft.description : undefined}
				/>
			) : (
				<PostBody
					name={nft ? nft.name : undefined}
					tokenId={id}
					isApprovedByOwner={nft ? nft.isApprovedByOwner : undefined}
					seller={nft ? nft.seller : undefined}
					collectionAddress={nft ? nft.collectionAddress : undefined}
					owner={nft ? nft.owner : undefined}
					price={nft ? nft.price : undefined}
					bio={nft ? nft.description : undefined}
				/>
			)}
		</VStack>
	);
}

export default Post;
