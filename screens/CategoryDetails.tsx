import {DrawerScreenProps} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, FlatList} from 'react-native';
import {Button, SafeAreaView, Text, View} from '../components';
import {MachineCard} from '../components/Machine';
import {useAppDispatch, useAppSelector} from '../Hooks/useRedux';
import {IMachineItem} from '../interface';
import {onAddMachine} from '../redux/Slices/machine.slice';
// import { useAppSelector } from '../Hooks/useRedux';
import {DrawerParamList} from '../types';
type Props = DrawerScreenProps<DrawerParamList, 'CategoryDetails'>;
import {nanoid} from 'nanoid';

export const CategoryDetails = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    Machine: {machines},
    Category: {attributes},
  } = useAppSelector(state => state);

  const {name, id} = props.route.params;

  const renderItem = ({item, index}: {[key: string]: any; index: number}) => {
    return (
      <MachineCard categoryId={id} machineId={item.id} values={item.values} />
    );
  };

  const memonizedRender = useMemo(() => renderItem, [machines[id as any]]);

  const addMachine = () => {
    const payload: IMachineItem = {
      categoryId: id,
      values: {},
      id: nanoid(10),
      title: undefined,
    };
    dispatch(onAddMachine(payload));
  };

  useFocusEffect(
    React.useCallback(() => {
      props.navigation.setOptions({
        title: name || 'Unnamed Category',
      });
    }, [props.route.params]),
  );

  return (
    <SafeAreaView>
      <Text style={style.pageTitle}>{name}</Text>
      <FlatList
        ListEmptyComponent={
          <>
            <Text style={{textAlign: 'center'}}>No Machines add yet</Text>
          </>
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.select({
            ios: 30,
            android: 50,
          }),
        }}
        style={{flex: 1}}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={memonizedRender}
        data={machines[id as any] || []}
        // onContentSizeChange={() => trackLastItemCount(categories.length)}
        // ref={scrollViewRef}
      />
      <View style={style.addBtnContainer}>
        <Button title="Add Machine" onPress={addMachine} />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  pageTitle: {
    fontSize: 28,
    fontFamily: 'MMedium',
    marginBottom: 10,
    zIndex:1
  },
  addBtnContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
