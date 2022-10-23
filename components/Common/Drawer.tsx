import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text} from '../Themed';
import {useAppDispatch, useAppSelector} from '../../Hooks/useRedux';
import Colors from '../../constants/Colors';
import {trackActiveDrawer} from '../../redux/Slices/categories.slice';

type Props = DrawerContentComponentProps;
export const DrawerContent = (props: Props) => {
  const {
    navigation: {navigate},
  } = props;
  const {
    Category: {categories, activeDrawer},
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Dashboard'}
        onPress={() => {
          navigate('Dashboard');
          dispatch(trackActiveDrawer('All'));
        }}
        activeTintColor={Colors.light.tint}
        focused={activeDrawer === 'All'}
      />
      {categories.map((cat, idx) => (
        <DrawerItem
          activeTintColor={Colors.light.tint}
          focused={cat.id === activeDrawer}
          key={idx}
          label={({focused, color}) => (
            <Text style={{color}}>{cat?.title || 'Unnamed Category'}</Text>
          )}
          onPress={() => {
            navigate('CategoryDetails', {id: cat.id, name: cat.title});
            dispatch(trackActiveDrawer(cat.id));
          }}
        />
      ))}
      <DrawerItem
        activeTintColor={Colors.light.tint}
        focused={activeDrawer==="Manage Categories"}

        label={({focused, color}) => (
          <Text style={{color}}>Manage Categories</Text>
        )}
        onPress={() => {
          navigate('AddCategory');
          dispatch(trackActiveDrawer("Manage Categories"));
        }}
      />
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
};
