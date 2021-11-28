import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Text, Pressable } from 'react-native';
import { FormItem } from 'react-native-form-component';

import Renders from "../assets/images.jpeg"

class Register extends Component {
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
                borderColor: '#474dff',
                borderWidth: 1,
            },
            container: {
                flex: 1,
                paddingTop: StatusBar.currentHeight,
            },
            scrollView: {
                marginHorizontal: 20,
            },
            text: {
                fontSize: 24,
                color: '#000',
                fontWeight: 'bold',
                textAlign: 'center',
            },
            buttonStyle: {
                backgroundColor: '#474dff',
                borderRadius: 50,
                padding: 10,
                margin: 10,
                width: '80%',
                alignItems: 'center',
            }
        });

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>
                        Basic Info
                    </Text>
                    <FormItem
                        style={styles.input}
                        label="Name"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Last Name"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                     <Text style={styles.text}>
                        Address Info
                    </Text>
                    <FormItem
                        style={styles.input}
                        label="Address"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Zip"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="City"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="State"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Country"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                     <Text style={styles.text}>
                        Contact Info
                    </Text>
                    <FormItem
                        style={styles.input}
                        label="Date"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Telephone"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                     <Text style={styles.text}>
                        Id and Nationality
                    </Text>
                    <FormItem
                        style={styles.input}
                        label="Id number"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Nationality"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                   <Text style={styles.text}>
                        User Info
                    </Text>
                    <FormItem
                        style={styles.input}
                        label="Email"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <FormItem
                        style={styles.input}
                        label="Password"
                        isRequired
                        value={""}
                        onChangeText={() => console.log()}
                        floatingLabel
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{color:"white",fontSize: 24}}>
                            Submit
                        </Text>
                    </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Register;