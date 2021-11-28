import { useContext, useState } from "react";
import {
	FormLabel,
	FormControl,
	VStack,
	Image,
	Input,
	Textarea,
} from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { useEffect } from "react";
import { CreatorsContext } from "../context/CreatorsContext";

function ProfileSettingsModal({ isOpen, onClose }) {
	const creatorsContext = useContext(CreatorsContext);
	const { creator } = creatorsContext;
	const { name, bio, profilePicUrl } = creator;

	useEffect(() => {
		setLocalName(name);
		setLocalBio(bio);
	}, [name, bio]);

	const [localName, setLocalName] = useState(name);
	const [localBio, setLocalBio] = useState(bio);

	const handleInputChange = (e, setter) => {
		setter(e.target.value);
	};

	const handleSubmit = () => {};

	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			modalHeader="Settings"
			modalFooterButtonText="Save"
			modalCloseButton={true}
			modalButtonOnClick={handleSubmit}
		>
			<VStack alignItems="center">
				<FormControl>
					<FormLabel width="100%" height="100%">
						<Image
							margin="auto"
							borderRadius="full"
							boxSize="80px"
							src={profilePicUrl}
						/>
					</FormLabel>
					<Input type="file" display="none" />
				</FormControl>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						value={localName}
						onChange={(e) => handleInputChange(e, setLocalName)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Bio</FormLabel>
					<Textarea
						value={localBio}
						onChange={(e) => handleInputChange(e, setLocalBio)}
					/>
				</FormControl>
			</VStack>
		</CustomModal>
	);
}

export default ProfileSettingsModal;
