/**
 * Learn more about Light and Dark modes:
 */

import {Text as DefaultText, View as DefaultView} from 'react-native';
import {
  SafeAreaView as DefaultSafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../Hooks/useColorScheme';

function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SafeAreaProps = ThemeProps & SafeAreaViewProps;

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return (
    <DefaultText
      style={[{color, fontFamily: 'Montserrat', fontSize:16, lineHeight:24}, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return (
    <DefaultSafeAreaView
      style={[
        {
          backgroundColor,
          // width: Layout.window.width - 20 * 2,
          // marginLeft: 'auto',
          // marginRight: 'auto',
          paddingHorizontal:20,
          paddingTop:-20,
          flex: 1,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
