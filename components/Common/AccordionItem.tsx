import React, {
  useState,
  useRef,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
// import Animated from "react-native-reanimated"

interface Props {
  title?: string;
  children: React.ReactNode;
  headerContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}
export const AccordionItem = ({
  title,
  children,
  headerContainerStyle,
  titleStyle,
  iconColor,
}: Props) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        useNativeDriver: false,
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        useNativeDriver: false,
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
    setOpen(!open);
  };

  const childrenWithProps = Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, {open});
    }

    return child;
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View
          style={[
            styles.titleContainer,
            headerContainerStyle,
            {...(!open && {borderRadius: 8})},
          ]}>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
          <Animated.View style={{transform: [{rotateZ: arrowAngle}]}}>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={24}
              color={iconColor || '#81909D'}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, {height: bodyHeight}]}>
        <View
          style={styles.bodyContainer}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {childrenWithProps}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  bodyBackground: {
    backgroundColor: '#F6F8FA',
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingLeft:1.5,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingVertical: 20,
    // height:60,
    // backgroundColor: Colors.light.tint,
    backgroundColor: '#F6F8FA',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleText: {
    fontSize: 14,
    // color: '#fff',
    fontWeight: '500',
    lineHeight:20,
    fontFamily:"Montserrat"
  },
  bodyContainer: {
    // padding: 1,
    // paddingLeft:1.5,
    width: '100%',
    position: 'absolute',
    // fontFamily:"", 
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
