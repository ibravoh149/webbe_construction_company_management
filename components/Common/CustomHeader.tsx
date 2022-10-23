import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  View as DefaultView,
  TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import {ThemeProps} from '../../types';
import {View, Text} from '../Themed';
import {Octicons} from '@expo/vector-icons';
import useColorScheme from '../../Hooks/useColorScheme';
import {BackButton} from './BackButton';

interface Props {
  style?: StyleProp<ViewStyle>;
  title?: string;
  showBackButton?: boolean;
  rightHeaderButton?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
}

const CustomHeader = (props: Props) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const {showBackButton = true, title, rightHeaderButton} = props;

  const onBackPress = () => {
    return props.onBackPress ? props.onBackPress?.() : navigation.goBack();
  };
  return (
    <View style={[styles.container, props.style]}>
      <DefaultView style={{...styles.optionContainer}}>
        {showBackButton && <BackButton onPress={onBackPress} />}
      </DefaultView>
      <DefaultView style={{...styles.optionContainer, alignItems: 'center', flex:1}}>
        <Text
          lightColor={Colors[colorScheme].textSecondary}
          darkColor={Colors[colorScheme].textSecondary}
          style={[styles.title, props.titleStyle]}>
          {title}
        </Text>
      </DefaultView>

      <DefaultView style={{...styles.optionContainer, alignItems: 'flex-end'}}>
        {rightHeaderButton && rightHeaderButton}
      </DefaultView>
    </View>
  );
};

export const InfoButton = (props: ThemeProps & TouchableOpacity['props']) => {
  const {lightColor, darkColor, style, ...otherProps} = props;
  // const backgroundColor= useThemeColor({light:lightColor, dark:darkColor}, "background");
  return (
    <TouchableOpacity
      style={[{backgroundColor: '#ffffff'}, styles.infobtn, style]}
      {...otherProps}>
      <Octicons name="info" size={24} color="#707070" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // marginHorizontal: 27,
    marginVertical: 15,
    height: 48,
  },
  optionContainer: {
    height: '100%',
    // width:48,
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'MMedium',
    textAlign: 'center',
  },
  infobtn: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    width: 48,
    height: 48,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
