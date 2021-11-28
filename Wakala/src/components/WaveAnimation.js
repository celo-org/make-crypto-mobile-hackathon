import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";
import { mix } from "react-native-redash";
import {COLORS, SIZES} from "../consts/theme";


const SIZE = SIZES.width * 0.3;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const Wave = ({children}) => {
    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, [progress]);
    const data1 = useDerivedValue(() => {
        const m = mix.bind(null, progress.value);
        return {
            from: {
                x: m(-0.5, -1),
                y: m(0.2, 0.5),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });
    const data2 = useDerivedValue(() => {
        const m = mix.bind(null, 1 - progress.value);
        return {
            from: {
                x: m(-0.1, -1),
                y: m(0.2, 0.5),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });
    const data3 = useDerivedValue(() => {
        const m = mix.bind(null, progress.value);
        return {
            from: {
                x: m(-0.3, -1),
                y: m(0.2, 1),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });
    const path1 = useAnimatedProps(() => {
        const { from, c1, c2, to } = data1.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });
    const path2 = useAnimatedProps(() => {
        const { from, c1, c2, to } = data2.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });
    const path3 = useAnimatedProps(() => {
        const { from, c1, c2, to } = data3.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <MaskedView
                maskElement={
                    <View
                        style={{
                            backgroundColor: "black",
                            width: SIZE,
                            height: SIZE,
                            borderRadius: SIZE / 2,
                        }}
                    />
                }
            >

                <Svg
                    width={SIZE}
                    height={SIZE}
                    style={{ backgroundColor: COLORS.white }}
                    viewBox="0 0 1 1"
                >
                    <AnimatedPath fill="#86b4ff" animatedProps={path2} />
                    <AnimatedPath
                        fill={StyleGuide.palette.primary} fillRule={0.6}
                        animatedProps={path1}
                    />
                    <AnimatedPath fill={StyleGuide.palette.tertiary} animatedProps={path3} />
                </Svg>
            </MaskedView>
            <View style={{position: "absolute", alignItems: "center", alignSelf: "center"}}>
                {children}
            </View>
        </View>
    );
};
const StyleGuide = {
    spacing: 8,
    palette: {
        primary: "#3884ff",
        secondary: "#FF6584",
        tertiary: "#bdadd7",
        backgroundPrimary: "#d5e5ff", // === rgba(primary, 0.1)
        background: "#f2f2f2",
        border: "#f2f2f2",
    },
    typography: {
        body: {
            fontSize: 17,
            lineHeight: 20,
        },
        callout: {
            fontSize: 16,
            lineHeight: 20,
        },
        caption: {
            fontSize: 11,
            lineHeight: 13,
        },
        footnote: {
            fontSize: 13,
            lineHeight: 18,
            color: "#999999",
        },
        headline: {
            fontSize: 17,
            lineHeight: 22,
        },
        subhead: {
            fontSize: 15,
            lineHeight: 20,
        },
        title1: {
            fontSize: 34,
            lineHeight: 41,
        },
        title2: {
            fontSize: 28,
            lineHeight: 34,
        },
        title3: {
            fontSize: 22,
            lineHeight: 26,
        },
    },
};

export default Wave;