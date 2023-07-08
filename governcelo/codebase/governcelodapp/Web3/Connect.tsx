import React from 'react';
import { TouchableOpacity } from 'react-native';

export type TouchableOpacityProps = TouchableOpacity["props"];

export default function Connect(props: TouchableOpacityProps) {
	const { style, children, ...otherProps } = props;

	return (
		<TouchableOpacity
			style={{
				width: "55%",
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 1,
				borderRadius: 5,
				borderColor: "#55bf7d",
				paddingVertical: 7,
				marginTop: 10
			}}
			{...otherProps}>
			{children}
		</TouchableOpacity>
	);


}
