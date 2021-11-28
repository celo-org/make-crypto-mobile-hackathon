/**
 * Swiper
 * Renders a swappable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

import React, {Component} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appTheme, {COLORS, FONTS} from "../consts/theme";
import {LinearGradient} from "expo-linear-gradient";
//import Button from './Button';
import {Feather} from "@expo/vector-icons";
import ProgressCircle from "./ProgressCircle";

// Detect screen width and height
const {width, height} = Dimensions.get('window');

export default class Swiper extends Component {

    // Props for ScrollView component
    static defaultProps = {
        // Arrange screens horizontally
        horizontal: true,
        // Scroll exactly to the next screen, instead of continous scrolling
        pagingEnabled: true,
        // Hide all scroll indicators
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        // Do not bounce when the end is reached
        bounces: false,
        // Do not scroll to top when the status bar is tapped
        scrollsToTop: false,
        // Remove offscreen child views
        removeClippedSubviews: true,
        // Do not adjust content behind nav-, tab- or toolbars automatically
        automaticallyAdjustContentInsets: false,
        // Fisrt is screen is active
        index: 0
    };

    state = this.initState(this.props);

    /**
     * Initialize the state
     */
    initState(props) {

        // Get the total number of slides passed as children
        const total = props.children ? props.children.length || 1 : 0,
            // Current index
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
            // Current offset
            offset = width * index;

        const state = {
            total,
            index,
            offset,
            width,
            height,
        };

        // Component internals as a class property,
        // and not state to avoid component re-renders when updated
        this.internals = {
            isScrolling: false,
            offset
        };

        return state;
    }

    /**
     * Scroll begin handler
     * @param {object} e native event
     */
    onScrollBegin = e => {
        // Update internal isScrolling state
        this.internals.isScrolling = true;
    }

    /**
     * Scroll end handler
     * @param {object} e native event
     */
    onScrollEnd = e => {
        // Update internal isScrolling state
        this.internals.isScrolling = false;

        // Update index
        this.updateIndex(e.nativeEvent.contentOffset
            ? e.nativeEvent.contentOffset.x
            // When scrolled with .scrollTo() on Android there is no contentOffset
            : e.nativeEvent.position * this.state.width
        );
    }

    /*
     * Drag end handler
     * @param {object} e native event
     */
    onScrollEndDrag = e => {
        const {contentOffset: {x: newOffset}} = e.nativeEvent,
            {children} = this.props,
            {index} = this.state,
            {offset} = this.internals;

        // Update internal isScrolling state
        // if swiped right on the last slide
        // or left on the first one
        if (offset === newOffset &&
            (index === 0 || index === children.length - 1)) {
            this.internals.isScrolling = false;
        }
    }

    /**
     * Update index after scroll
     * @param {object} offset content offset
     */
    updateIndex = (offset) => {
        const state = this.state,
            diff = offset - this.internals.offset,
            step = state.width;
        let index = state.index;

        // Do nothing if offset didn't change
        if (!diff) {
            return;
        }

        // Make sure index is always an integer
        index = parseInt(index + Math.round(diff / step), 10);

        // Update internal offset
        this.internals.offset = offset;
        // Update index in the state
        this.setState({
            index
        });
    }

    /**
     * Swipe one slide forward
     */
    swipe = () => {
        // Ignore if already scrolling or if there is less than 2 slides
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }

        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;

        // Call scrollTo on scrollView component to perform the swipe
        this.scrollView && this.scrollView.scrollTo({x, y, animated: true});

        // Update internal scroll state
        this.internals.isScrolling = true;

        // Trigger onScrollEnd manually on android
        if (Platform.OS === 'android') {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    }

    /**
     * Render ScrollView component
     * @param {array} pages to swipe through
     */
    renderScrollView = pages => {
        return (
            <ScrollView ref={component => {
                this.scrollView = component;
            }}
                        {...this.props}
                        contentContainerStyle={[styles.wrapper, this.props.style]}
                        onScrollBeginDrag={this.onScrollBegin}
                        onMomentumScrollEnd={this.onScrollEnd}
                        onScrollEndDrag={this.onScrollEndDrag}
            >
                {pages.map((page, i) =>
                    // Render each slide inside a View
                    <View style={[styles.fullScreen, styles.slide]} key={i}>
                        {page}
                    </View>
                )}
            </ScrollView>
        );
    }

    /**
     * Render pagination indicators
     */
    renderPagination = () => {
        if (this.state.total <= 1) {
            return null;
        }

        const ActiveDot = <View style={[styles.dot, styles.activeDot]}/>,
            Dot = <View style={styles.dot}/>;

        let dots = [];

        for (let key = 0; key < this.state.total; key++) {
            dots.push(key === this.state.index
                // Active dot
                ? React.cloneElement(ActiveDot, {key})
                // Other dots
                : React.cloneElement(Dot, {key})
            );
        }

        return (
            <View
                pointerEvents="none"
                style={[styles.pagination, styles.fullScreen]}
            >
                {dots}
            </View>
        );
    }

    /**
     * Render Continue or Done button
     */
    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
                <TouchableOpacity
                    onPress={lastScreen ? () => this.props.navigation.navigate("Signup") : () => this.swipe()}>
                    <ProgressCircle
                        value={(1 + this.state.index) / this.state.total}
                        size={58}
                        thickness={3}
                        color={COLORS.primary}
                        unfilledColor={"transparent"}
                        animationMethod="spring"
                        animationConfig={{speed: 4}}>
                        <LinearGradient
                            colors={COLORS.buttonGradient}
                            style={styles.button}>
                            <Feather name="arrow-right" size={25} color="white"/>
                        </LinearGradient>
                    </ProgressCircle>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Render the component
     */
    render = ({children} = this.props) => {
        return (
            <View style={[styles.container, styles.fullScreen]}>
                {this.renderScrollView(children)}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Set width and height to the screen size
    fullScreen: {
        width: width,
        height: height
    },
    // Main container
    container: {
        position: 'relative'
    },
    // Slide
    slide: {
        backgroundColor: 'transparent'
    },
    // Pagination indicators
    pagination: {
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    // Pagination dot
    dot: {
        backgroundColor: 'rgba(0,0,0,.25)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    // Active dot
    activeDot: {
        backgroundColor: '#FFFFFF',
    },
    // Button wrapper
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        bottom: appTheme.SIZES.height * 0.09,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
});