/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import {DrawerScreenProps} from '@react-navigation/drawer';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type DrawerParamList = {
  CategoryDetails: {id?: string, name:string};
  Dashboard: undefined;
  Category: undefined;
  AddCategory:undefined
};

export type DrawerProps<Screen extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, Screen>,
    NativeStackScreenProps<DrawerParamList>
  >;
