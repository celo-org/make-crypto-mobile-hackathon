import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, Image, Pressable, View } from 'react-native';
import Renders from "../assets/images.png"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            number: '',
        };
    }

    componentWillUnmount() {

    }

    onChangeText = (event) => {
    }

    render() {
        const styles = StyleSheet.create({
            input: {
                height: 40,
                margin: 12,
                padding: 10,
                borderRadius: 5,
                width: '80%'
            },
            content: {
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'white'
            },
            content2: {
                paddingTop: 50,
            },
            content3: {
                padding: 10,
            },
            text: {
                fontSize: 24,
                color: '#000',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            },
            text2: {
                fontSize: 24,
                color: 'white',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            },
            viewContainer: {
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: 100
            },
            buttonStyle: {
                backgroundColor: `#474dff`,
                borderRadius: 50,
                margin: 10,
                width: '35%',
                height: "24%",
                alignItems: 'center',
            },
        });

        return (
            <SafeAreaView style={styles.content}>
                <View style={styles.content2}>
                    <Image source={Renders} alt="Cat" 
                    style={{width: 200, height: 200}}
                    />
                </View>
                <View style={styles.content3}>
                    <Text style={styles.text}>CELO based DApp that improves Cash out processes for Mexico.</Text>
                </View>
                <View style={styles.viewContainer}>
                    <Pressable style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.text2}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.text2}>Register</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;