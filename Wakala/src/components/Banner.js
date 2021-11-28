import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SIZES } from "../consts/theme";

import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Banner = React.forwardRef((props, ref) => {
  const bottom = useSharedValue(-350);
  const shadowOpacity = useSharedValue(0);
  const isShadowVisible = useSharedValue(false);

  const AnimatedStyles = {
    modal: useAnimatedStyle(() => {
      return {
        bottom: bottom.value,
      };
    }),
    shadow: useAnimatedStyle(() => {
      return {
        zIndex: isShadowVisible.value ? 2 : -1,
        opacity: shadowOpacity.value,
      };
    }),
  };

  const openBanner = () => {
    isShadowVisible.value = true;
    shadowOpacity.value = withSpring(0.5);
    bottom.value = withSpring(SIZES.height / 2 - props.style.height / 2, {
      damping: 15,
    });
  };

  const closeBanner = () => {
    bottom.value = withTiming(-props.style.height);
    shadowOpacity.value = withTiming(0, {
      duration: 200,
    });
    isShadowVisible.value = withTiming(false, {
      duration: 200,
    });
  };

  React.useImperativeHandle(ref, () => ({ openBanner, closeBanner }));

  return (
    <>
      <Animated.View style={[styles.shadow, AnimatedStyles.shadow]} />
      <AnimatedLinearGradient
        colors={["#F7EFFA", "#FCF8ED"]}
        start={[1, 0]}
        end={[1, 1]}
        style={[{ ...props.style }, styles.modal, AnimatedStyles.modal]}
      >
        {props.content}
      </AnimatedLinearGradient>
    </>
  );
});

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#000",
  },

  modal: {
    width: "auto",
    borderRadius: 16,
    position: "absolute",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    zIndex: 3,
  },
});

export default Banner;
