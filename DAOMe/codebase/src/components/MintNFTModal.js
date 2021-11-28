import { useState, useContext } from "react";
import CustomModal from "./CustomModal";
import {
	VStack,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Image,
	Box,
	Text,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import { NFTContext } from "../context/NFTContext";
import { NFTStorage, File } from "nft.storage";
import { Web3Context } from "../context/Web3Context";

const client = new NFTStorage({
	token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
});

function MintNFTModal({ isOpen, onClose }) {
	const [mintingNFT, setMintingNFT] = useState(false);
	const [isImageUploaded] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [fileObj, setFileObj] = useState(null);
	const [royaltyPercentage, setRoyaltyPercentage] = useState(0);
	const [imageFile, setImageFile] = useState(null);
	const [uploadingMetadata, setUploadingMetadata] = useState(false);

	const nftContext = useContext(NFTContext);
	const web3Context = useContext(Web3Context);
	const { mintNFTUsingSigner } = nftContext;
	const { setOngoingTx } = web3Context;

	const imageUploadBg = useColorModeValue(
		"var(--chakra-colors-brand-100)",
		"var(--chakra-colors-brand-700)"
	);

	const handleImageUpload = async ({ target }) => {
		setImageFile(URL.createObjectURL(target.files[0]));
		if (target.files && target.files[0]) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(target.files[0]);
			reader.onloadend = async () => {
				let imageData = Buffer(reader.result);
				let fileObj = new File([imageData], target.files[0].name, {
					type: "image/*",
				});
				setFileObj(fileObj);
			};
		}
	};

	const handleInputChange = (e, setter) => {
		setter(e.target.value);
	};

	const handleMintNFT = async () => {
		setUploadingMetadata(true);
		const metadata = await client.store({
			name: title,
			description,
			image: fileObj,
		});

		let metadataSplit = metadata.url.split("/", 4);
		const url =
			"https://ipfs.io/ipfs/" +
			metadataSplit[metadataSplit.length - 2] +
			"/" +
			metadataSplit[metadataSplit.length - 1];
		setUploadingMetadata(false);
		setMintingNFT(true);
		let tx = await mintNFTUsingSigner(url, royaltyPercentage, onClose);
		setOngoingTx(
			`https://alfajores-blockscout.celo-testnet.org/tx/${tx.hash}`
		);
		setImageFile(null);
		setMintingNFT(false);
	};

	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			modalHeader="Mint NFT"
			modalCloseButton={true}
			modalButtonOnClick={handleMintNFT}
			modalFooterButtonText="Mint"
			modalButtonLoadingState={uploadingMetadata || mintingNFT}
		>
			<VStack spacing={5} alignItems="center">
				<FormControl>
					<FormLabel>
						{imageFile !== null ? (
							<Image
								margin="auto"
								width="200px"
								height="200px"
								textAlign="center"
								src={imageFile}
							/>
						) : (
							<Box
								w="100%"
								h="150px"
								background={imageUploadBg}
								borderRadius={5}
								padding={2}
							>
								<VStack
									w="100%"
									h="100%"
									border="2px dashed"
									borderRadius={5}
									justifyContent="center"
								>
									<Icon
										w="20px"
										h="20px"
										as={AiOutlineCamera}
									/>
									<Text>Upload Image</Text>
								</VStack>
							</Box>
						)}
					</FormLabel>
					<Input
						display="none"
						onChange={handleImageUpload}
						type="file"
						accept="image/*"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Title</FormLabel>
					<Input
						onChange={(e) => handleInputChange(e, setTitle)}
						value={title}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea
						onChange={(e) => handleInputChange(e, setDescription)}
						value={description}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Royalty Percentage</FormLabel>
					<Input
						onChange={(e) =>
							handleInputChange(e, setRoyaltyPercentage)
						}
						value={royaltyPercentage}
					/>
				</FormControl>
			</VStack>
		</CustomModal>
	);
}

export default MintNFTModal;
