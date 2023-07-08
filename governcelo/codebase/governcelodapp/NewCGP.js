import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, View } from 'react-native';

export default class NewCGP extends React.Component{

	render() {
		return (
			<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
				<StatusBar style="auto" translucent />
				<Text style={{marginVertical: 10, marginHorizontal: 10, fontSize: 16, fontWeight: "600", textAlign: "center"}}>General Governance Proposals and Changes</Text>
				<TextInput 
					style={styles.inputtitle}
					placeholder="Title"
					multiline />
				<TextInput 
					style={styles.inputtitle} 
					placeholder="Discussions-to"
					multiline/>
				<TextInput
					style={styles.stylemultiline} 
					placeholder="Motivation"
					multiline
					numberOfLines={5}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline} 
					placeholder="Benefits"
					multiline
					numberOfLines={5}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Verification"
					multiline
					numberOfLines={5}
					textAlignVertical={'top'}/>
				<View style={{marginVertical: 5, borderTopWidth: 1, width: '80%', borderColor: '#999999'}} />
				<Text style={{marginLeft: "15%", fontSize: 14, fontWeight: "500", alignSelf: "flex-start"}}>Risks in these fields:</Text>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Consensus"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Proof-of-stake"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Governance"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Protocol economics"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Stability protocol"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Security"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<TextInput
					style={styles.stylemultiline}
					placeholder="Privacy"
					multiline
					numberOfLines={2}
					textAlignVertical={'top'}/>
				<View style={{marginVertical: 5, borderTopWidth: 1, width: '80%', borderColor: '#999999'}} />
				<TextInput
					style={styles.styleusefullinks} 
					placeholder="Useful links"
					multiline
					numberOfLines={5}
					textAlignVertical={'top'}/>
				<TouchableOpacity onPress={() => {}} style={styles.makeprbutton}>
					<Text style={styles.txtmakepr}>MAKE PROPOSAL</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	makeprbutton: {
		backgroundColor: "#55bf7d",
		borderRadius: 5,
		paddingHorizontal: 35,
		paddingVertical: 10,
		marginVertical: 20
	},
	txtmakepr: {
		color: '#ffffff',
		fontSize: 13
	},
	inputtitle: {
		borderColor: "#999999",
		borderWidth: 1,
		padding: 2,
		borderRadius: 5,
		marginBottom: 5,
		width: '70%'
	},
	stylemultiline: {
		borderColor: "#999999",
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		marginBottom: 5,
		width: '70%'
	},
	styleusefullinks: {
		borderColor: "#999999",
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		marginBottom: 5,
		marginTop: 25,
		width: '70%'
	}
});