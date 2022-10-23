import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View as DefaultView} from 'react-native';
import Colors from '../../constants/Colors';
import {DataTypes} from '../../constants/enum';
import {useAppDispatch, useAppSelector} from '../../Hooks/useRedux';
import {updateMachine} from '../../redux/Slices/machine.slice';
import {View, Text} from '../Themed';
import {InputTypes} from './InputTypes';

interface Props {
  AttributeName?: string;
  dataTtype: string;
  machineId: string;
  value?: string;
  categoryId?: string;
  index: number;
  readonly?:boolean
}
export const MachineCardInput = (props: Props) => {
  const {categoryId, machineId} = props;
  // console.log(props.value)
  const {
    Machine: {machines},
  } = useAppSelector(state => state);

    // console.log(machines[categoryId as string]);

  //   console.log(props.index);

  const dispatch = useAppDispatch();

  const onChange = (key: string, value: any) => {
    dispatch(
      updateMachine({
        categoryId,
        machineId,
        name: key,
        value,
      }),
    );
  };
  const machine = useMemo(() => {
    return machines[categoryId as string].find(
      machine => machine.id === machineId,
    );
  }, [machines[categoryId as string]]);


  return (
    <DefaultView style={style.fieldContainer}>
      <View>
        <Text
          lightColor={Colors.light.textPrimary}
          darkColor={Colors.dark.textPrimary}>
          {props.AttributeName}
        </Text>
        <InputTypes
        readonly={props.readonly}
          datatype={props.dataTtype as keyof typeof DataTypes}
          attName={props.AttributeName}
          onChange={onChange}
            value={
              machine?.values?.[props.AttributeName as string]
            }
        />
      </View>
    </DefaultView>
  );
};

const style = StyleSheet.create({
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
