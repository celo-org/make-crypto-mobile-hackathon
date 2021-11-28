import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TextInput, Text, Image, Pressable, View, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import Tab1 from '../tabs/tab1';
import Tab2 from '../tabs/tab2';
import Tab3 from '../tabs/tab3';
import Renders from "../assets/images2.png"

class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            number: 0,
            selectorSytle1: {
                borderColor: "black",
                backgroundColor: "white",
                
                width: Dimensions.get('window').width * .3333,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
            selectorSytle2: {
                borderColor: "black",
                backgroundColor: `#474dff`,
                
                width: Dimensions.get('window').width * .3333,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
            selectorSytle3: {
                borderColor: "black",
                backgroundColor: `#474dff`,
                
                width: Dimensions.get('window').width * .3333,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
            selectorText1: {
                fontSize: 24,
                color: 'black',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            },
            selectorText2: {
                fontSize: 24,
                color: 'white',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            },
            selectorText3: {
                fontSize: 24,
                color: 'white',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            }
        };
        this.selector = this.selector.bind(this);
    }

    componentWillUnmount() {

    }

    onChangeText = (event) => {
    }

    componentDidMount() {
        this.selector(0);
    }

    selector(number) {
        switch (number) {
            case 0:
                this.setState({
                    number: 0,
                    selectorSytle1: {
                        ...this.state.selectorSytle1,
                        borderColor: "black",
                        backgroundColor: "white",
                    },
                    selectorSytle2: {
                        ...this.state.selectorSytle2,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorSytle3: {
                        ...this.state.selectorSytle3,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorText1: {
                        ...this.state.selectorText1,
                        color: 'black',
                    },
                    selectorText2: {
                        ...this.state.selectorText2,
                        color: 'white',
                    },
                    selectorText3: {
                        ...this.state.selectorText3,
                        color: 'white',
                    }
                })
                break;
            case 1:
                this.setState({
                    number: 1,
                    selectorSytle1: {
                        ...this.state.selectorSytle1,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorSytle2: {
                        ...this.state.selectorSytle2,
                        borderColor: "black",
                        backgroundColor: "white",
                    },
                    selectorSytle3: {
                        ...this.state.selectorSytle3,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorText1: {
                        ...this.state.selectorText1,
                        color: 'white',
                    },
                    selectorText2: {
                        ...this.state.selectorText2,
                        color: 'black',
                    },
                    selectorText3: {
                        ...this.state.selectorText3,
                        color: 'white',
                    }
                })
                break;
            case 2:
                this.setState({
                    number: 2,
                    selectorSytle1: {
                        ...this.state.selectorSytle1,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorSytle2: {
                        ...this.state.selectorSytle2,
                        borderColor: "black",
                        backgroundColor: `#474dff`,
                    },
                    selectorSytle3: {
                        ...this.state.selectorSytle3,
                        borderColor: "black",
                        backgroundColor: "white",
                    },
                    selectorText1: {
                        ...this.state.selectorText1,
                        color: 'white',
                    },
                    selectorText2: {
                        ...this.state.selectorText2,
                        color: 'white',
                    },
                    selectorText3: {
                        ...this.state.selectorText3,
                        color: 'black',
                    }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const styles = StyleSheet.create({
            scrollView: {
                marginHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: `#474dff`,    
            },
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
            footer: {
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: 0
            },
            buttonStyle: {
                backgroundColor: 'black',
                borderRadius: 50,
                padding: 10,
                margin: 10,
                width: Dimensions.get('window').width * .4,
                alignItems: 'center',
            },
            buttonLogoutStyle: {
                backgroundColor: `#474dff`,
                borderRadius: 50,
                padding: 10,
                width: Dimensions.get('window').width * .3,
                alignItems: 'center',
            },
            header: {
                padding: 0,
                textAlign: "center",
                background: "#1abc9c",
                color: "black",
                fontSize: 30
            }
        });

        return (
            <>
                <Header
                    leftComponent={ <Image source={Renders} alt="Cat" 
                    style={{width: 304/8, height: 342/8, marginLeft: 20}}
                    />}
                    rightComponent={
                        <Pressable style={styles.buttonLogoutStyle} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Logout
                            </Text>
                        </Pressable>
                    }
                    backgroundColor="white"
                />
                <ScrollView style={styles.scrollView}>
                    {
                        this.state.number === 0 &&
                        <View>
                            <Tab1/>
                        </View>
                    }
                    {
                        this.state.number === 1 &&
                        <View>
                            <Text>
                                <Tab2/>
                            </Text>
                        </View>
                    }
                    {
                        this.state.number === 2 &&
                        <View>
                            <Text>
                                <Tab3/>
                            </Text>
                        </View>
                    }
                </ScrollView>
                <View style={styles.footer}>
                    <Pressable style={this.state.selectorSytle1}
                        onPress={() => this.selector(0)}>
                        <Text style={this.state.selectorText1}>
                            Home
                        </Text>
                    </Pressable>
                    <Pressable style={this.state.selectorSytle2}
                        onPress={() => this.selector(1)}>
                        <Text style={this.state.selectorText2}>
                            Transfer
                        </Text>
                    </Pressable>
                    <Pressable style={this.state.selectorSytle3}
                        onPress={() => this.selector(2)}>
                        <Text style={this.state.selectorText3}>
                            Cash Out
                        </Text>
                    </Pressable>
                </View>
            </>
        );
    }
}

export default App1;