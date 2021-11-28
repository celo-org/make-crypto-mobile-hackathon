import { VStack } from "@chakra-ui/react";
import CustomAvatar from "./CustomAvatar";

function ProfileHeader({ username, profilePicUrl }) {
	return (
		<VStack
			width="100%"
			height="80px"
			position="relative"
			backgroundImage="url('https://pbs.twimg.com/media/D-jnKUPU4AE3hVR.jpg')"
		>
			<CustomAvatar
				top="90%"
				left="50%"
				w="60px"
				h="60px"
				transform="translate(-50%, -50%)"
				position="absolute"
				name={username}
				src={profilePicUrl}
			/>
		</VStack>
	);
}

export default ProfileHeader;
