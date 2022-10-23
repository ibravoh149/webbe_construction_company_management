import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../Hooks/useRedux';
import {removeMachine} from '../../redux/Slices/machine.slice';
import {Button} from '../Common';
import {Text, View} from '../Themed';
import {MachineCardInput} from './MachineCardInput';

export const MachineCard = ({
  categoryId,
  machineId,
  values,
  readonly,
}: {
  categoryId?: string;
  machineId: string;
  readonly?: boolean;
  values: any;
}) => {
  const {
    Category: {attributes, defaultTitles},
  } = useAppSelector(state => state);


  const hasDefaultTitleValue =
    attributes[categoryId as string]?.length > 0 &&
    (defaultTitles?.[categoryId as string]
      ? defaultTitles?.[categoryId as string]
      : attributes?.[categoryId as string][0]
      ? attributes?.[categoryId as string][0]?.key
      : undefined);

  const dispatch = useAppDispatch();
  const renderItem = ({item, index}: {[key: string]: any; index: number}) => {
    return (
      <MachineCardInput
        AttributeName={item.key}
        dataTtype={item.dataType}
        machineId={machineId}
        categoryId={categoryId}
        index={index}
        readonly={readonly}
        // value={item.values[item.key]}
      />
    );
  };

  const remove = () => {
    dispatch(removeMachine({categoryId, machineId}));
  };

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text
          style={{textAlign: 'center', color: 'white', fontFamily: 'MMedium'}}>
          {values[hasDefaultTitleValue]?.toString() || 'Unnamed Car'}
        </Text>
      </View>

      <FlatList
        ListEmptyComponent={
          <>
            <Text style={{marginTop: 10}}>
              No Attribute was added for this machine category
            </Text>
          </>
        }
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={attributes[categoryId as any] || []}
      />
      <Button title="Remove machine" onPress={remove} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    // borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#C1C7D0',
    // padding: 10,
    paddingBottom: 20,
    width: '100%',
    marginBottom: 20,
    // flex: 1,
  },

  titleContainer: {
    backgroundColor: '#0C0B2F',
    padding: 10,
    borderRadius: 12,
  },

  btn: {
    paddingVertical: 12,
    borderRadius: 8,
    // paddingHorizontal:26
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },

  btn1: {backgroundColor: Colors.light.tint},
  btn2: {borderWidth: 1, borderColor: Colors.light.tint},
  btnIcon: {
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'MMedium',
  },

  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderColor: '#F6F8FA',
    paddingVertical: 10,
    alignItems: 'center',
  },
  attrValue: {
    fontFamily: 'MMedium',
  },
  settingBtn: {
    marginHorizontal: 5,
  },
});
