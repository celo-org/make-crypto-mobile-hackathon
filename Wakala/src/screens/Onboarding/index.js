import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Swiper from '../../components/Swiper';
import {SLIDER_IMAGE_001, SLIDER_IMAGE_002, SLIDER_IMAGE_003, SLIDER_IMAGE_004} from "../../assets/images";
import {COLORS, FONTS, SIZES} from "../../consts/theme";
import ScreenCmpt from "../../components/ScreenCmpt";

export default class OnboardingScreen extends Component {
    render() {
        return (
            <ScreenCmpt style={styles.container}
                            colors={["rgba(247, 239, 250, 1.0)", "rgba(252, 248, 237, 1.0)"]}
                            start={[1, 0]}
                            end={[1, 1]}>
                <Swiper navigation={this.props.navigation}>
                    <View style={styles.slide}>
                        <Image source={SLIDER_IMAGE_001} style={styles.image} />
                        <Text style={styles.header}>Easy</Text>
                        <Text style={styles.text}>Wakala makes it easy for you to top up your cUSD wallet. Both Add or withdraw cUSD</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image source={SLIDER_IMAGE_002} style={styles.image} />
                        <Text style={styles.header}>Community</Text>
                        <Text style={styles.text}>Wakala is a community, owned by its members.</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image source={SLIDER_IMAGE_003} style={styles.image} />
                        <Text style={styles.header}>Speed</Text>
                        <Text style={styles.text}>Post a request, will get answered SUPER FAST, by community agent.</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image source={SLIDER_IMAGE_004} style={styles.image} />
                        <Text style={styles.header}>Earn</Text>
                        <Text style={styles.text}>Want to be a community yourself? Fulfill requests and earn commissions. the faster you fulfill, the more you earn.</Text>
                    </View>
                </Swiper>
            </ScreenCmpt>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: SIZES.height
    },
    // Slide styles
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally

    },
    // Header styles
    header: {
        color: COLORS.primary,
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    image: {
        height: 250,
        maxWidth: SIZES.width*0.8,
        resizeMode: "contain",
        //marginLeft: 20
    },
    // Text below header
    text: {
        ...FONTS.body3,
        color: COLORS.textBlack,
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
        marginBottom: 80
    },
});