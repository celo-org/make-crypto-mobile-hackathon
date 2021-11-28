import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { FormItem } from 'react-native-form-component';
import { Icon, ThemeConsumer } from 'react-native-elements'

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class Tab2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label1: 'Fiat Wallet',
            label2: 'Crypto Wallet',
            number: "0",
            conv: "0",
            rates: {
                cUSD: 4.770111933240953,
                cEUR: 4.221924696707145
            },
            disabled: false,
            fiatbalance: 0,
            cryptoBalance: 0,
            ewallet: 'ewallet_cdfb92059981c82138b04509f0f97107',
            address: '0xE7c1fc2B18A0Ee4F087694bca90436Eba6f16Fca',
            stateFiat: true,
            stateCrypto: true,
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        this.fromCrypto = this.fromCrypto.bind(this);
        this.fromFiat = this.fromFiat.bind(this);
    }

    componentDidMount() {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/get-account-balance',
            headers: {
                'ewallet': this.state.ewallet
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                console.log(response.data.data.accounts[0].balance)
                _this.setState({ fiatbalance: response.data.data.accounts[0].balance });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios.get('https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/get-rates', {
            cancelToken: this.source.token
        }).then(function (response) {
            _this.setState({
                rates: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/get-balance',
            headers: {
                'address': this.state.address
            },
            cancelToken: this.source.token
        }).then(function (response) {
            console.log(response.data)
            _this.setState({
                cryptoBalance: response.data.CELO / 1000000000000000000,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillUnmount() {
        if (this.source) {
            this.source.cancel("Component got unmounted");
        }
    }

    fromFiat(value) {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/transfer',
            headers: {
                'ewallets': this.state.ewallet,
                'ewalletd': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'amount': this.state.number,
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                let __this = _this;
                _this.axios({
                    method: 'get',
                    url: 'https://XXXXXXXXXXX/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: _this.source.token
                })
                    .then(function (response) {
                        console.log("OK Fiat")
                        __this.setState({
                            disabled: false,
                            stateFiat: true,
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/transfer-celo',
            headers: {
                'from': '0x34bEDa2a779096a2DcC1aAaf8B7790A5FF5349D9',
                'to': '0xE7c1fc2B18A0Ee4F087694bca90436Eba6f16Fca',
                'amount': (value * 1000000000000000000).toString()
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                console.log("OK Crypto")
                _this.setState({
                    disabled: false,
                    stateCrypto: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fromCrypto(value) {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/transfer',
            headers: {
                'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'ewalletd': this.state.ewallet,
                'amount': parseFloat(this.state.conv).toFixed(2).toString(),
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                let __this = _this;
                _this.axios({
                    method: 'get',
                    url: 'https://XXXXXXXXXXX/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: _this.source.token
                })
                    .then(function (response) {
                        console.log("OK Fiat")
                        __this.setState({
                            disabled: false,
                            stateFiat: true,
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/transfer-celo',
            headers: {
                'from': '0xE7c1fc2B18A0Ee4F087694bca90436Eba6f16Fca',
                'to': '0x34bEDa2a779096a2DcC1aAaf8B7790A5FF5349D9',
                'amount': (parseFloat(value) * 1000000000000000000).toString()
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                console.log("OK Crypto")
                _this.setState({
                    disabled: false,
                    stateCrypto: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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
        const styles = StyleSheet.create({
            input: {
                fontSize: 24,
                width: Dimensions.get('window').width * 0.9,
                borderRadius: 5,
                borderColor: '#474dff',
                borderWidth: 1,
            },
            text: {
                fontSize: 24,
                textAlign: 'center',
                color: 'black',
            },
            text2: {
                fontSize: 24,
                textAlign: 'center',
                color: 'black',
            }
        });
        const button = {
            borderColor: "black",
            backgroundColor: `#474dff`,
            borderWidth: 1,
            borderRadius: 50,
        };

        return (
            <View style={{ paddingTop: 10 }}>
                <Text style={styles.text}>
                    {this.state.label1}
                </Text>
                <FormItem
                    style={styles.input}
                    isRequired
                    value={this.state.number}
                    onChangeText={(text) => {
                        if (isNumeric(text) || text === "" || text === "0." || text === "0..") {
                            if (text === "") {
                                this.setState({
                                    number: "0",
                                    conv: "0"
                                });
                            }
                            else if (text === "0.") {
                                this.setState({
                                    number: "0.",
                                    conv: "0"
                                });
                            }
                            else if (text === "0..") {
                                this.setState({
                                    number: "0.",
                                    conv: "0"
                                });
                            }
                            else {
                                if (this.state.label1 === "Fiat Wallet") {
                                    if (parseFloat(text) >= parseFloat(this.state.fiatbalance)) {
                                        let temp = parseFloat(this.state.fiatbalance) / this.state.rates.cUSD;
                                        this.setState({
                                            number: parseFloat(this.state.fiatbalance).toString(),
                                            conv: temp.toString()
                                        });
                                    }
                                    else {
                                        let temp = parseFloat(text) / this.state.rates.cUSD;
                                        this.setState({
                                            number: parseFloat(text).toString(),
                                            conv: temp.toString()
                                        });
                                    }
                                }
                                else {

                                    if (parseFloat(text) >= parseFloat(this.state.cryptoBalance)) {
                                        let temp = parseFloat(this.state.cryptoBalance) * this.state.rates.cUSD;
                                        this.setState({
                                            number: parseFloat(this.state.cryptoBalance).toString(),
                                            conv: temp.toString()
                                        });
                                    }
                                    else {
                                        let temp = parseFloat(text) * this.state.rates.cUSD;
                                        this.setState({
                                            number: parseFloat(text).toString(),
                                            conv: temp.toString()
                                        });
                                    }
                                }
                            }
                        }
                    }}
                    floatingLabel
                />
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Pressable style={button}
                        onPress={() => {
                            if (this.state.label1 === "Fiat Wallet") {
                                this.setState({
                                    label1: "Crypto Wallet",
                                    label2: "Fiat Wallet",
                                    number: this.state.conv,
                                    conv: this.state.number
                                });
                            }
                            else {
                                this.setState({
                                    label1: "Fiat Wallet",
                                    label2: "Crypto Wallet",
                                    number: this.state.conv,
                                    conv: this.state.number
                                });
                            }
                        }}>
                        <Icon
                            name="import-export"
                            type="material"
                            color="white"
                            size={50}
                        />
                    </Pressable>
                </View>
                <View style={{ paddingTop: 20 }} />
                <FormItem
                    style={styles.input}
                    isRequired
                    value={this.state.conv}
                    floatingLabel
                    disabled
                />
                <Text style={styles.text2}>
                    {this.state.label2}
                </Text>
                {
                    hr()
                }
                <Pressable
                    disabled={!(this.state.stateCrypto && this.state.stateFiat && this.state.fiatbalance > 0 && this.state.cryptoBalance > 0)}
                    style={button}
                    onPress={() => {
                        this.setState({
                            stateCrypto: false,
                            stateFiat: false
                        }, () => {
                            if (this.state.label1 === "Fiat Wallet") {
                                console.log("Fiat to Crypto")
                                this.fromFiat(this.state.conv);
                            }
                            else {
                                console.log("Crypto to Fiat")
                                this.fromCrypto(this.state.number);
                            }
                        });
                    }}
                >
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                            {
                                (this.state.fiatbalance > 0 && this.state.cryptoBalance > 0) ? <>
                                    {
                                        (this.state.stateCrypto && this.state.stateFiat) ? "Convert" : "Converting..."
                                    }
                                </> : "Loading..."
                            }
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

export default Tab2;