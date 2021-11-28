import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, Image, Pressable, View, Dimensions } from 'react-native';
import Renders from "../assets/images.jpeg"
import { Form, FormItem } from 'react-native-form-component';
import { throwStatement } from '@babel/types';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            number: '',
            user: '',
            password: '',
            lenTemp: 0,
            hidden: ""
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
                borderRadius: 5,
                width: '80%',
                borderColor: '#474dff',
                borderWidth: 1,
                color: 'black',
            },
            content: {
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                //backgroundColor: '#0d6efd'
            },
            content2: {
                paddingTop: 50,
            },
            text: {
                fontSize: 24,
                color: '#000',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            },
            viewContainer: {
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: 0
            },
            buttonStyle: {
                backgroundColor: '#474dff',
                borderRadius: 50,
                padding: 10,
                margin: 10,
                width: Dimensions.get('window').width*.4,
                alignItems: 'center',
            }
        });

        return (
            <SafeAreaView style={styles.content}>
                <FormItem
                    style={styles.input}
                    label="Email"
                    isRequired
                    value={this.state.user}
                    onChangeText={(text) => {
                        this.setState({
                            user: text
                        })
                    }}
                    floatingLabel
                />
                <FormItem
                    style={styles.input}
                    label="Password"
                    isRequired
                    value={this.state.hidden}
                    onChangeText={(text) => {
                        let temp = this.state.password;
                        let hidden = "";
                        let len = this.state.hidden.length;
                        if (len < text.length) {
                            temp += text.substring(text.length-1, text.length);
                        } else {
                            temp = temp.substring(0, temp.length-1);
                        }
                        for (let i = 0; i < temp.length; i++) {
                            hidden += "*";
                        }
                        this.setState({
                            hidden: hidden,
                            password: temp
                        })
                    }}
                    floatingLabel
                />
                <View style={{flexDirection: "row"}}>
                    <Pressable style={styles.buttonStyle} onPress={() => {
                        if(
                            this.state.user === "celouser@gmail.com" &&
                            this.state.password === "toor"
                        )
                        {
                        this.props.navigation.navigate('App1')
                        }
                    }}>
                        <Text style={{ color: "white", fontSize: 24}}>
                            Login
                        </Text>
                    </Pressable>
                    <Pressable style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: "white", fontSize: 24}}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;