import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FormItem } from 'react-native-form-component';

const button = {
    borderColor: "black",
    backgroundColor: `#474dff`,

    borderRadius: 50
};

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class Credit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "0",
            disabled: false,
            ewallet: "ewallet_cdfb92059981c82138b04509f0f97107"
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    addCredit(amount) {
        if (isNumeric(amount) && parseFloat(amount) <= 10) {
            let _this = this;
            this.axios({
                method: 'get',
                url: 'https://XXXXXXXXXXX/transfer',
                headers: {
                    'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                    'ewalletd': this.state.ewallet,
                    'amount': parseFloat(amount).toFixed(2).toString(),
                    'currency': "USD"
                },
                cancelToken: this.source.token
            })
                .then(function (response) {
                    let __this = _this;
                    console.log(response.data);
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
                                disabled: false
                            });
                            __this.props.callback();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });
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
        const styles = {
            input: {
                color: 'black',
                margin: 12,
                borderRadius: 5,
                width: '100%',
                borderColor: '#474dff',
                borderWidth: 1,
            }
        }
        return (
            <>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ paddingTop: 20 }} />
                    <FormItem
                        style={styles.input}
                        isRequired
                        value={""}
                        value={this.state.number}
                        onChangeText={(text) => {
                            if (isNumeric(text) || text === "") {
                                if (text === "") {
                                    this.setState({
                                        number: "0"
                                    });
                                }
                                else if (text.substring(0, 1) === "0") {
                                    this.setState({
                                        number: text.substring(1, 2)
                                    });
                                }
                                else {
                                    this.setState({
                                        number: text
                                    });
                                }
                            }
                        }}
                        floatingLabel
                    />
                    {
                        hr()
                    }
                    <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                        <Pressable style={button}
                            disabled={this.state.disabled}
                            onPress={() => {
                                this.setState({
                                    disabled: true
                                });
                                this.addCredit(this.state.number);
                            }}>
                            <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                                {
                                    this.state.disabled ? "Processing..." : "Cash In"
                                }
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </>
        );
    }
}

export default Credit;