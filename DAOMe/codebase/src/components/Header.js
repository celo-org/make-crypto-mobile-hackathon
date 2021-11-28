import { useContext } from "react";
import {
	HStack,
	Text,
	useDisclosure,
	IconButton,
	useColorMode,
	useColorModeValue,
	Spacer,
} from "@chakra-ui/react";
import { FiSettings, FiSun } from "react-icons/fi";
import { CreatorsContext } from "../context/CreatorsContext";
import ProfileSettingsModal from "./ProfileSettingsModal";

function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { toggleColorMode } = useColorMode();
	const creatorsContext = useContext(CreatorsContext);
	const { creator } = creatorsContext;
	const bg = useColorModeValue("white", "var(--chakra-colors-gray-800)");
	const color = useColorModeValue("var(--chakra-colors-gray-800)", "white");
	return (
		<>
			<ProfileSettingsModal isOpen={isOpen} onClose={onClose} />
			<HStack
				top={0}
				justifyContent="space-between"
				padding={4}
				borderBottom="1px solid"
				borderColor="brand.200"
				position="sticky"
				zIndex="1000"
				background={bg}
				width="100%"
				height="8vh"
				boxShadow="0 10px 200px 6px rgba(0,0,0,.1)"
			>
				<Text>DAOMe</Text>
				<Spacer />
				<IconButton
					onClick={toggleColorMode}
					variant="ghost"
					colorScheme="whiteAlpha"
					icon={<FiSun stroke={color} />}
				/>
				<IconButton
					onClick={onOpen}
					variant="ghost"
					colorScheme="whiteAlpha"
					disabled={
						(creator === null || creator === undefined) &&
						Object.keys(creator).length === 0
					}
					icon={<FiSettings stroke={color} />}
				/>
			</HStack>
		</>
	);
}

export default Header;
