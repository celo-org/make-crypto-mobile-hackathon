import React, { Component } from 'react';
import { View, Pressable, Text, Dimensions } from 'react-native';
import Credit from '../components/credit';
import Crypto from '../components/crypto';
import Fiat from '../components/fiat';
import Verify from '../components/verify';


const button = {
    borderColor: "#2b2e99",
    borderWidth: 1,
    backgroundColor: `#474dff`,
    borderRadius: 50,
    margin: 1,
};

class Tab1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiatSelected: "flex",
            cryptoSelected: "none",
            addCreditSelected: "none",
            verifySelected: "none",
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    callback(){

    }

    render() {
        const input = {
            borderRadius: 5,
            borderColor: '#353abf',
            borderWidth: 1,
        }
        return (
            <View style={{paddingTop:10}}>
                <Pressable style={button}
                    onPress={() => {
                        if (this.state.fiatSelected === "none") {
                            this.setState({
                                fiatSelected: "flex",
                                cryptoSelected: "none",
                                addCreditSelected: "none",
                                verifySelected: "none",
                            });
                        }
                        else {
                            this.setState({
                                fiatSelected: "none"
                            });
                        }
                    }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                            Fiat Account
                        </Text>
                    </View>
                </Pressable>
                <View style={{ display: this.state.fiatSelected }}>
                   <Fiat/>
                </View>
                <Pressable style={button}
                    onPress={() => {
                        if (this.state.cryptoSelected === "none") {
                            this.setState({
                                fiatSelected: "none",
                                cryptoSelected: "flex",
                                addCreditSelected: "none",
                                verifySelected: "none",
                            });
                        }
                        else {
                            this.setState({
                                cryptoSelected: "none",
                            });
                        }
                    }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                            Crypto Account
                        </Text>
                    </View>
                </Pressable>
                <View style={{ display: this.state.cryptoSelected }}>
                   <Crypto/>
                </View>
                <Pressable style={button}
                    onPress={() => {
                        if (this.state.addCreditSelected === "none") {
                            this.setState({
                                addCreditSelected: "flex",
                                fiatSelected: "none",
                                cryptoSelected: "none",
                                verifySelected: "none",
                            });
                        }
                        else {
                            this.setState({
                                addCreditSelected: "none",
                            });
                        }
                    }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                            Cash In
                        </Text>
                    </View>
                </Pressable>
                <View style={{ display: this.state.addCreditSelected }}>
                    <Credit/>
                </View>
                <Pressable style={button}
                    onPress={() => {
                        if (this.state.verifySelected === "none") {
                            this.setState({
                                verifySelected: "flex",
                                fiatSelected: "none",
                                cryptoSelected: "none",
                                addCreditSelected: "none",
                            });
                        }
                        else {
                            this.setState({
                                verifySelected: "none",
                            });
                        }
                    }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, padding: 8 }}>
                            Verify
                        </Text>
                    </View>
                </Pressable>
                <View style={{ display: this.state.verifySelected }}>
                   <Verify/>
                </View>
            </View>
        );
    }
}

export default Tab1;