import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

export default class ForkModal extends React.Component{
	render(){
		return(
			<View style={styles.centeredView}>
				<Modal
					animationType="none"
					visible={true}
					transparent={true}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{flexDirection: "row", alignItems: "center"}}>
								<ActivityIndicator size="large" color="#55bf7d" style={{marginRight: 2}}/>
								<Text style={{marginLeft: 2}}>Forking repository...</Text>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 2,
		padding: 10,
		width: '80%',
		alignItems: "center",
		shadowColor: "#000000",
		shadowOffset: {
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 25
	}
});