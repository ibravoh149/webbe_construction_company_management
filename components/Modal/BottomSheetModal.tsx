import React, {Children, useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  ModalProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Layout from '../../constants/Layout';
import {AntDesign} from '@expo/vector-icons';
import {View} from '../Themed';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  interpolate
} from 'react-native-reanimated';
// import {PanGestureHandler} from 'react-native-gesture-handler';
interface Props {
  children: React.ReactNode;
  contentContainer?: StyleProp<ViewStyle>;
  visible?: boolean;
  close?: () => void;
}

const ModalBody = (props: Props) => {
  const DefaultState = Layout.window.height; 
  const [defaultHeight] = useState(Layout.window.height / 2);
  // const contentPosition= useSharedValue(defaultHeight)

  const contentoffset = useSharedValue(DefaultState);
  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: contentoffset.value}],
    };
  });

  const calculateContent = () => {
    if (props.visible) {
      contentoffset.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      contentoffset.value = withTiming(DefaultState, {
        duration: 300,
      });
    }
  };
  useEffect(() => {
    calculateContent();

    return () => {
      contentoffset.value = withTiming(DefaultState, {
        duration: 300,
      });
    };
  }, [props.visible]);

  return (
    <Animated.View style={contentStyle}>
      <TouchableOpacity style={styles.closeBTN} onPress={props.close}>
        <AntDesign name="close" size={12} color="#6D7A98" />
      </TouchableOpacity>
      {/* <PanGestureHandler onGestureEvent={eventHandler}> */}
        <Animated.View style={[styles.body , props.contentContainer, {minHeight:defaultHeight}]}>
          {props.children}
        </Animated.View>
      {/* </PanGestureHandler> */}
    </Animated.View>
  );
};

export const BottomSheetModal = (props: Props & ModalProps) => {
  const {...otherProps} = props;
  return (
    <Modal
      animationType={props.animationType || 'fade'}
      style={[{...styles.container}, props.style]}
      visible={props.visible}
      transparent
      statusBarTranslucent
      {...otherProps}>
      <View style={styles.container}>
        <ModalBody
          close={props.onRequestClose as any}
          contentContainer={props.contentContainer}
          visible={props.visible}>
          <View style={styles.trayHandle}></View>
          {props.children}
        </ModalBody>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Layout.window.height,
    display: 'flex',
    justifyContent: 'center',
    // paddingHorizontal: (Layout.window.height / 61) * 3,
  },

  body: {
    // borderRadius: 12,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    width: '100%',
    // minHeight:Layout.window.height - (301 * 2),
    // minHeight: Layout.window.height / 4,
    // height:"100%",
    paddingHorizontal: 20,
    paddingVertical: 13,
    // flex:1
    backgroundColor: '#fff',
  },
  trayHandle: {
    height: 4,
    width: 30,
    backgroundColor: '#E6E9F0',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 2,
    marginBottom: 15,
  },
  closeBTN: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
