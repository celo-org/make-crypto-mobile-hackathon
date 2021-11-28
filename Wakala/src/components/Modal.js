import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Modal = React.forwardRef((props, ref) => {
  const height = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);
  const isShadowVisible = useSharedValue(false);

  const AnimatedStyles = {
    modal: useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    }),
    shadow: useAnimatedStyle(() => {
      return {
        zIndex: isShadowVisible.value ? 2 : -1,
        opacity: shadowOpacity.value,
      };
    }),
  };

  const openModal = () => {
    isShadowVisible.value = true;
    shadowOpacity.value = withSpring(0.5);
    height.value = withSpring(props.style.height, {
      damping: 15,
    });
  };

  const closeModal = () => {
    height.value = withTiming(0);
    shadowOpacity.value = withTiming(0, {
      duration: 200,
    });
    isShadowVisible.value = withTiming(false, {
      duration: 200,
    });
  };

  React.useImperativeHandle(ref, () => ({ openModal, closeModal }));

  return (
    <>
      <Animated.View
        style={[styles.shadow, AnimatedStyles.shadow]}
      ></Animated.View>
      <Animated.View style={[styles.modal, AnimatedStyles.modal]}>
        {props.content}
      </Animated.View>
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
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    zIndex: 3,

    position: "absolute",
    bottom: -40,
  },
});

export default Modal;
