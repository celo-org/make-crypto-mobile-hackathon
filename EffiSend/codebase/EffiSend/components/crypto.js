import React, { Component } from 'react';
import { Linking, Text, View } from 'react-native';

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            CELO: "...",
            cUSD: "...",
            cEUR: "...",
            transactions: [],
            address: '0xE7c1fc2B18A0Ee4F087694bca90436Eba6f16Fca'
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    componentDidMount() {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/get-balance',
            headers: {
                'address': this.state.address
            },
            cancelToken: this.source.token
        }).then(function (response) {
            _this.setState({
                CELO: response.data.CELO,
                cUSD: response.data.cUSD,
                cEUR: response.data.cEUR,
            });
        }).catch(function (error) {
            console.log(error);
        });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/get-transactions',
            headers: {
                'address': '0xE7c1fc2B18A0Ee4F087694bca90436Eba6f16Fca'
            },
            cancelToken: this.source.token
        }).then(function (response) {
            _this.setState({
                transactions: response.data.slice(0,10)
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

    render() {
        const hr = function () {
            return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>O</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
        }
        return (
            <>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }} onPress={() => Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/address/${this.state.address}/token-transfers`)}>
                            Address
                        </Text>
                        <Text style={{ color: "blue",textDecorationLine:"underline", fontSize: 22, padding: 3 }} onPress={() => Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/address/${this.state.address}/token-transfers`)}>
                            {this.state.address.substring(0, 10) + "..."}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            CELO
                        </Text>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            {(parseInt(this.state.CELO) / 1000000000000000000).toFixed(3)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            cUSD
                        </Text>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            {(parseInt(this.state.cUSD) / 1000000000000000000).toFixed(3)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            cEUR
                        </Text>
                        <Text style={{ color: "black", fontSize: 22, padding: 3 }}>
                            {(parseInt(this.state.cEUR) / 1000000000000000000).toFixed(3)}
                        </Text>
                    </View>
                    {
                        hr()
                    }
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 24, padding: 8 }}>
                            Transactions
                        </Text>
                        {
                            this.state.transactions.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                                        <Text style={{ color: "black", fontSize: 20, padding: 10, textAlign: "center" }}>
                                            <Text>
                                                {"Type\n"}
                                            </Text>
                                            <Text style={{ color: "black", fontSize: 16, padding: 10, textAlign: "center" }}>
                                                {item.type}
                                            </Text>
                                        </Text>
                                        <Text style={{ color: "black", fontSize: 20, padding: 10, textAlign: "center" }}>
                                            <Text>
                                                {"Status\n"}
                                            </Text>
                                            {
                                                item.status === "Success" ?
                                                    <Text style={{ color: "green" }}>
                                                        Success
                                                    </Text>
                                                    :
                                                    <Text style={{ color: "red" }}>
                                                        Failed
                                                    </Text>
                                            }
                                        </Text>
                                        <Text style={{ color: "black", fontSize: 20, padding: 10, textAlign: "center" }} onPress={() => Linking.openURL(item.link)}>
                                            <Text>
                                                {"Amount\n"}
                                            </Text>
                                            {
                                                item.inout === "in" ?
                                                    <Text style={{ color: "green" }}>
                                                        {item.amount.substring(0, 5)}{" "}{item.currency}
                                                    </Text>
                                                    :
                                                    <Text style={{ color: "red" }}>
                                                        - {item.amount.substring(0, 5)}{" "}{item.currency}
                                                    </Text>
                                            }
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </>
        );
    }
}

export default Crypto;