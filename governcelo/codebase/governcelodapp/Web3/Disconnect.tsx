import React from 'react';
import { TouchableOpacity } from 'react-native';

export type TouchableOpacityProps = TouchableOpacity["props"];

export default function Disconnect(props: TouchableOpacityProps) {
	const { style, children, ...otherProps } = props;

	return (
		<TouchableOpacity
			style={{
				width: "55%",
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 1,
				borderRadius: 5,
				borderColor: "#fcc16b",
				paddingVertical: 7
			}}
			{...otherProps}>
			{children}
		</TouchableOpacity>
	);


}
