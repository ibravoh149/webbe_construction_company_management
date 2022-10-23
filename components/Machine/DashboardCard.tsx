import React, { useEffect } from 'react';
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
}
export const DashboardMachineCard = (props: Props) => {
  const {categoryId, machineId} = props;
//   const {
//     Machine: {machines},
//   } = useAppSelector(state => state);

//   console.log(machines[categoryId as string]);

//   console.log(props.index);

//   const dispatch = useAppDispatch();

//   const onChange = (key: string, value: any) => {
//     dispatch(
//       updateMachine({
//         categoryId,
//         machineId,
//         name: key,
//         value,
//       }),
//     );
//   };

//   const setValue=()=>{
//     const machine= machines[categoryId as string][props.index];
//     console.log(machine)
//   }

//   useEffect(()=>{
//     // setValue()
//   },[machines])

  return (
    <DefaultView style={style.fieldContainer}>
      <View>
        <Text
          lightColor={Colors.light.textPrimary}
          darkColor={Colors.dark.textPrimary}>
          {props.AttributeName}
        </Text>
        
        <InputTypes
          datatype={props.dataTtype as keyof typeof DataTypes}
          attName={props.AttributeName}
        //   onChange={onChange}
        //   value={
        //     machines[categoryId as string][props.index].values[
        //       props?.AttributeName as string
        //     ]
        //   }
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
