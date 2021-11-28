import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import Button from "./components/Button";
import Heading from "./components/Heading";
import Spinner from "./components/Spinner";

const theme = extendTheme({
	initialColorMode: "light",
	useSystemColorMode: false,
	fonts: {
		body: "Inter",
		heading: "Inter",
	},
	styles: {
		global: (props) => ({
			body: {
				fontFeatureSettings: `"kern" 1,"liga" 1,"calt" 0,"kern"`,
				color: mode("purple.800", "white")(props),
			},
		}),
	},
	colors: {
		brand: {
			100: "var(--chakra-colors-purple-100)",
			200: "var(--chakra-colors-purple-200)",
			300: "var(--chakra-colors-purple-300)",
			400: "var(--chakra-colors-purple-400)",
			500: "var(--chakra-colors-purple-500)",
			600: "var(--chakra-colors-purple-600)",
			700: "var(--chakra-colors-purple-700)",
			800: "var(--chakra-colors-purple-800)",
			900: "var(--chakra-colors-purple-900)",
		},
	},
	components: {
		Button,
		Heading,
		Spinner,
	},
});

export default theme;
