import { Avatar, SkeletonCircle } from "@chakra-ui/react";

function CustomAvatar(props) {
	return (
		<SkeletonCircle {...props} isLoaded={props.src !== undefined}>
			<Avatar
				w="100%"
				h="100%"
				borderRadius="full"
				borderColor="brand.500"
				color="brand.500"
				border="2px solid"
				padding="2px"
				background="transparent"
				name={props.name}
				src={props.src}
			/>
		</SkeletonCircle>
	);
}

export default CustomAvatar;
