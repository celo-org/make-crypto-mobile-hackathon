import React, { Component } from 'react';
import { Dimensions, Linking, Pressable, Text, View } from 'react-native';

const button = {
    borderColor: "#474dff",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    width: Dimensions.get('window').width * .60
};

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            contact: 'cont_6a6e001c788b6636d6a9a87d2d2d5591',
            ewallet: 'ewallet_cdfb92059981c82138b04509f0f97107',
            linkVerification: ""
        };
        this.createVerification = this.createVerification.bind(this);
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    createVerification() {
        let _this = this;
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXX/create-verification',
            headers: {
                'contact': this.state.contact,
                'ewallet': this.state.ewallet
            },
            cancelToken: this.source.token
        }).then(function (response) {
            _this.setState({ linkVerification: response.data.data.redirect_url });
        }).catch(function (error) {
            console.log(error);
        });
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
                <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Pressable style={button}
                        onPress={() => {
                            this.createVerification();
                        }}>
                        {
                            this.state.linkVerification !== "" ?
                                <Text style={{ color: "black", fontSize: 24, padding: 8, textAlign: 'center' }} onPress={() => Linking.openURL(`${this.state.linkVerification}`)}>
                                    Click to verify
                                </Text>
                                :
                                <Text style={{ color: "black", fontSize: 24, padding: 8, textAlign: 'center' }}>
                                    Verify
                                </Text>
                        }
                    </Pressable>
                </View>
            </>
        );
    }
}

export default Verify;