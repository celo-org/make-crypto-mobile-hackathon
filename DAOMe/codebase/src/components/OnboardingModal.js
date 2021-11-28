import { useContext, useState } from "react";
import {
	FormControl,
	Input,
	Textarea,
	VStack,
	FormLabel,
	Image,
} from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { NFTStorage, File } from "nft.storage";
import axios from "axios";
import { CreatorsContext } from "../context/CreatorsContext";

const client = new NFTStorage({
	token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
});

function OnboardingModal({ isOpen, onClose, accountAddress }) {
	const creatorsContext = useContext(CreatorsContext);
	const { checkUserRegistered, registerCreator } = creatorsContext;

	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [profilePicUrl, setProfilePicUrl] = useState(
		"https://bit.ly/dan-abramov"
	);
	const [nftCollectionName, setNFTCollectionName] = useState("");
	const [nftCollectionSymbol, setNFTCollectionSymbol] = useState("");
	// const [ tokenName, setTokenName ] = useState("");
	// const [ tokenSymbol, setTokenSymbol ] = useState("");
	// const [ totalSupply, setTotalSupply ] = useState(0);
	const [registeringUser, setRegisteringUser] = useState(false);

	const handleSignUp = async () => {
		setRegisteringUser(true);

		const creator = {
			username,
			name,
			bio,
			profilePicUrl,
			nftCollectionName,
			nftCollectionSymbol,
		};

		await registerCreator(creator);
		await checkUserRegistered();
		setRegisteringUser(false);
	};

	const handleInputChange = (e, setter) => {
		setter(e.target.value);
	};

	const onImageChange = ({ target }) => {
		if (target.files && target.files[0]) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(target.files[0]);
			reader.onloadend = async () => {
				let imageData = Buffer(reader.result);
				let fileObj = new File([imageData], target.files[0].name, {
					type: "image/*",
				});
				const metadata = await client.store({
					name: target.files[0].name,
					description: "",
					image: fileObj,
				});

				let metadataSplit = metadata.url.split("/", 4);
				const url =
					"https://ipfs.io/ipfs/" +
					metadataSplit[metadataSplit.length - 2] +
					"/" +
					metadataSplit[metadataSplit.length - 1];

				let response = await axios.get(url);
				let image = response.data.image;
				let imageSplit = image.split("/", 4);
				const imageUrl =
					"https://ipfs.io/ipfs/" +
					imageSplit[imageSplit.length - 2] +
					"/" +
					imageSplit[imageSplit.length - 1];
				setProfilePicUrl(imageUrl);
			};
		}
	};

	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			modalCloseButton={false}
			modalHeader={`Onboarding`}
			modalFooterButtonText="Sign Up"
			modalButtonOnClick={handleSignUp}
			modalButtonLoadingState={registeringUser}
		>
			<VStack spacing="10px">
				<FormControl>
					<FormLabel borderRadius="full" boxSize="70px" margin="auto">
						<Image
							margin="auto"
							boxSize="70px"
							borderRadius="full"
							src={profilePicUrl}
						/>
					</FormLabel>
					<Input
						display="none"
						onChange={onImageChange}
						type="file"
						accept="image/*"
					/>
				</FormControl>
				<FormControl>
					<Input
						placeholder="accountAddress"
						disabled
						value={accountAddress}
					/>
				</FormControl>
				<FormControl>
					<Input
						placeholder="username"
						onChange={(e) => handleInputChange(e, setUsername)}
						value={username}
					/>
				</FormControl>
				<FormControl>
					<Input
						placeholder="name"
						onChange={(e) => handleInputChange(e, setName)}
						value={name}
					/>
				</FormControl>
				<FormControl>
					<Textarea
						placeholder="bio"
						onChange={(e) => handleInputChange(e, setBio)}
						value={bio}
					/>
				</FormControl>
				<FormControl>
					<Input
						placeholder="NFT Collection Name"
						onChange={(e) =>
							handleInputChange(e, setNFTCollectionName)
						}
						value={nftCollectionName}
					/>
				</FormControl>
				<FormControl>
					<Input
						placeholder="NFT Symbol"
						onChange={(e) =>
							handleInputChange(e, setNFTCollectionSymbol)
						}
						value={nftCollectionSymbol}
					/>
				</FormControl>
				{/* <FormControl>
                    <Input placeholder="Token Name" onChange={(e) => handleInputChange(e, setTokenName)} value={tokenName} />
                </FormControl>
                <FormControl>
                    <Input placeholder="Token Symbol" onChange={(e) => handleInputChange(e, setTokenSymbol)} value={tokenSymbol} />
                </FormControl>
                <FormControl>
                    <Input placeholder="Total Supply" onChange={(e) => handleInputChange(e, setTotalSupply)} value={totalSupply} />
                </FormControl> */}
			</VStack>
		</CustomModal>
	);
}

export default OnboardingModal;
