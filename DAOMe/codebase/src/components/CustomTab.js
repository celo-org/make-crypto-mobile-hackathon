import { Tab, Text, HStack, useColorModeValue } from "@chakra-ui/react";

function CustomTab({ icon, tabTitle, number }) {
	const bg = useColorModeValue(
		"var(--chakra-colors-brand-100)",
		"var(--chakra-colors-brand-700)"
	);
	return (
		<Tab
			_selected={{
				background: "var(--chakra-colors-brand-500)",
				color: "var(--chakra-colors-brand-100)",
			}}
			_focus={{ outline: "none" }}
			background={bg}
			borderColor="brand.100"
			borderBottom={0}
			transition="all .3s ease-out"
			borderRadius={4}
		>
			<HStack>
				{/* {icon} */}
				<Text fontWeight="600">{tabTitle.toUpperCase()}</Text>
				{/* <Text
					background="var(--chakra-colors-brand-100)"
					borderRadius="full"
					color="var(--chakra-colors-brand-500)"
					w={6}
					h={6}
				>
					{number}
				</Text> */}
			</HStack>
		</Tab>
	);
}

export default CustomTab;
