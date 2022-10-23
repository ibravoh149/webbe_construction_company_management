import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '../types';
const Drawer = createDrawerNavigator<DrawerParamList>();
import {Dashboard, Category, AddCategory, CategoryDetails} from '../screens';
import {DrawerContent} from '../components';

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="AddCategory"
      screenOptions={
        {
          //   drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        }
      }>
      {/* Screens */}
      <Drawer.Screen
        name="AddCategory"
        component={AddCategory}
        // options={{
        //   drawerLabel: 'Manage Categories',
        // }}
      />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="CategoryDetails" component={CategoryDetails} options={{
        // header
      }} />
    </Drawer.Navigator>
  );
};
