import React, { Component } from 'react';
import { View, Pressable, Dimensions, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import { FormItem } from 'react-native-form-component';
import CreditCard from 'react-native-credit-card';
import { throwStatement } from '@babel/types';

const generator = require('creditcard-generator')

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Tab3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: randomNumber(111,999),
            expiry: '1226',
            name: 'EffiCard APP',
            number: generator.GenCC("VISA"),
            imageFront: require('../images/card-front.png'),
            imageBack: require('../images/card-back.png'),
            cardHolder: false,
            amount: '',
            redirect_url: '',
            creating: false,
            name: '',
            clabe: '',
        }
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        this.createSpeiTransfer = this.createSpeiTransfer.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    createSpeiTransfer() {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/create-SPEI',
            headers: {
                'amount': this.state.amount,
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                console.log(response.data.data.redirect_url);
                _this.setState({
                    redirect_url: response.data.data.redirect_url,
                    creating: false
                });
            })
    }

    render() {
        const hr = function () {
            return <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>O</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
        }
        const button = {
            borderColor: "black",
            backgroundColor: `#474dff`,
            borderRadius: 50,
        };

        const input = {
            borderRadius: 5,
            borderColor: '#474dff',
            borderWidth: 1,
        }

        return (
            <View style={{ paddingTop: 32, width: Dimensions.get('window').width * 0.9 }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    {
                        this.state.cardHolder ?
                            <CreditCard
                                type={this.state.type}
                                imageFront={require('../images/card-front.png')}
                                imageBack={require('../images/card-back.png')}
                                shiny={false}
                                bar={false}
                                focused={this.state.focused}
                                number={this.state.number}
                                name={this.state.name}
                                expiry={this.state.expiry}
                                cvc={this.state.cvc} />
                            :
                            <Pressable style={button}
                                onPress={() => {
                                    this.setState({ cardHolder: true });
                                }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                                        Issue Virtual Card
                                    </Text>
                                </View>
                            </Pressable>
                    }
                </View>
                {
                    hr()
                }
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "black", fontSize: 24, padding: 8 }}>
                        Spei Transfer
                    </Text>
                </View>
                <FormItem
                    style={input}
                    label="Name"
                    isRequired
                    value={this.state.name}
                    onChangeText={(event) => {
                        this.setState({
                            name: event
                        })
                    }}
                    floatingLabel
                />
                <FormItem
                    style={input}
                    label="CLABE"
                    isRequired
                    value={this.state.clabe}
                    onChangeText={(event) => {
                        this.setState({ clabe: event })
                    }}
                    floatingLabel
                />
                <FormItem
                    style={input}
                    label="Amount USD (will be converted to MXN)"
                    isRequired
                    value={this.state.amount}
                    onChangeText={(event) => {
                        if (!isNaN(event)) {
                            this.setState({ amount: event })
                        }
                    }}
                    floatingLabel
                />
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Pressable
                        disabled={this.state.creating}
                        style={button}
                        onPress={() => {
                            if (this.state.redirect_url === '') {
                                this.setState({ creating: true });
                                this.createSpeiTransfer();
                            } else {
                                console.log("redirecting");
                                Linking.openURL(this.state.redirect_url);
                            }
                        }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                                {
                                    this.state.redirect_url === '' ?
                                        <>
                                            {
                                                !this.state.creating ? "Create Spei Transfer" : "Creating..."
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                "Open SPEI URL"
                                            }
                                        </>
                                }
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }
}

export default Tab3;