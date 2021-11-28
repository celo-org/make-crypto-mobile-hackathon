import React, { Component } from 'react';
import { Text, View } from 'react-native';


class Fiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            ewallet: 'ewallet_cdfb92059981c82138b04509f0f97107',
            transactions: []
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
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
                _this.setState({ number: response.data.data.accounts[0].balance });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/get-transactions-ewallet',
            headers: {
                'ewallet': this.state.ewallet
            },
            cancelToken: this.source.token
        })
            .then(function (response) {
                _this.setState({ transactions: response.data.data });
            })
            .catch(function (error) {
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
                        <Text style={{ color: "black", fontSize: 24, padding: 8 }}>
                            Fiat Wallet:
                        </Text>
                        <Text style={{ color: "black", fontSize: 24, padding: 8 }}>
                            {this.state.number} USD
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
                                return <View key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
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
                                        <Text style={{ color: "black", fontSize: 16, padding: 10, textAlign: "center" }}>
                                            {item.status}
                                        </Text>
                                    </Text>
                                    <Text style={{ color: "black", fontSize: 20, padding: 10, textAlign: "center" }}>
                                        <Text>
                                            {"Amount\n"}
                                        </Text>
                                        {
                                            item.amount >= 0 ?
                                                <Text style={{ color: "green", fontSize: 16, padding: 10, textAlign: "center" }}>
                                                    {item.amount}{" "}{item.currency}
                                                </Text>
                                                :
                                                <Text style={{ color: "red", fontSize: 16, padding: 10, textAlign: "center" }}>
                                                    {item.amount}{" "}{item.currency}
                                                </Text>
                                        }
                                    </Text>
                                </View>
                            }
                            )
                        }
                    </View>
                </View>
            </>
        );
    }
}

export default Fiat;