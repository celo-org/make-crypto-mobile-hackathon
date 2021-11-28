import { mode } from "@chakra-ui/theme-tools";

const Button = {
	variants: {
		custom_base: (props) => ({
			outline: 0,
			letterSpacing: "2px",
			bg: mode("brand.500", "brand.500")(props),
			color: mode("white", "white")(props),
			boxShadow: mode(
				"0 0 0 0 var(--chakra-colors-brand-500),  0 0 1rem 3px var(--chakra-colors-brand-100)",
				"0 0 0 0 var(--chakra-colors-brand-800),  0 0 1rem 3px var(--chakra-colors-brand-600)"
			)(props),
			transition: "all .3s ease-out",
			_hover: {
				boxShadow: mode(
					"0 0 0 .25rem var(--chakra-colors-brand-500),  0 0 1rem -2px var(--chakra-colors-brand-100)",
					"0 0 0 .25rem var(--chakra-colors-brand-800),  0 0 1rem -2px var(--chakra-colors-brand-600)"
				)(props),
				_disabled: {
					background: "brand.300",
					boxShadow: "0 0 0 0",
				},
			},
			_active: {
				boxShadow: "0 0 0 0",
				transform: "translateY(.15rem)",
			},
			_disabled: {
				_hover: {
					opacity: "1",
				},
			},
		}),
		custom_ghost: (props) => ({
			outline: 0,
			letterSpacing: "2px",
			bg: mode("brand.100", "brand.100")(props),
			color: mode("brand.500", "brand.500")(props),
			boxShadow:
				"0 0 0 0 var(--chakra-colors-brand-100), 0 0 1rem .1rem var(--chakra-colors-brand-100)",
			transition: "all .3s ease-out",
			_hover: {
				boxShadow:
					"0 0 0 .25rem var(--chakra-colors-brand-100), 0 0 1rem .1rem var(--chakra-colors-brand-100)",
				_disabled: {
					background: "brand.100",
					boxShadow: "0 0 0 0",
				},
			},
			_active: {
				boxShadow: "0 0 0 0",
				transform: "translateY(.15rem)",
			},
			_disabled: {
				_hover: {
					opacity: "1",
				},
			},
		}),
	},
	defaultProps: {
		variant: "custom_base",
	},
};

export default Button;
