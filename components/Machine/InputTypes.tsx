import React from 'react';
import {StyleSheet, TextInput, View as DefaultView} from 'react-native';
import Colors from '../../constants/Colors';
import {DataTypes} from '../../constants/enum';
import {DatePickerInput} from '../Common';
import {Text, View} from '../Themed';
import {Switch} from 'react-native-switch';

interface Props {
  datatype: keyof typeof DataTypes;
  attName?: string;
  value?: any;
  onChange?: (key: string, value: any) => void;
  readonly?: boolean;
}
export const InputTypes = (props: Props) => {
  const onSwitchChange = (value: Boolean) => {
    props.onChange?.(props.attName as string, value);
  };

  const onTextChange = (value: string) => {
    props.onChange?.(props.attName as string, value);
  };
  const inputTypes: Record<keyof typeof DataTypes, React.ReactNode> = {
    [DataTypes.checkbox]: (
      <View style={style.switchContainer}>
        <Switch
          disabled={props.readonly}
          value={props?.value}
          onValueChange={onSwitchChange}
          activeText=""
          inActiveText=""
          backgroundActive={Colors.light.tint}
          circleBorderWidth={0.2}
          circleSize={21}
          backgroundInactive="#C1C7D0"
          switchLeftPx={3}
          switchRightPx={3}
          switchWidthMultiplier={2}
        />
      </View>
    ),
    [DataTypes.text]: (
      <TextInput
        editable={!props.readonly}
        style={style.textInputContainer}
        selectionColor={Colors.light.tint}
        placeholder={!props.readonly?`Enter ${props.attName}`:undefined}
        placeholderTextColor={Colors.light.textPrimary}
        onChangeText={onTextChange}
        defaultValue={props?.value}
      />
    ),
    [DataTypes.number]: (
      <TextInput
        editable={!props.readonly}
        style={style.textInputContainer}
        selectionColor={Colors.light.tint}
        placeholder={!props.readonly?`Enter ${props.attName}`:undefined}
        placeholderTextColor={Colors.light.textPrimary}
        keyboardType="numeric"
        onChangeText={onTextChange}
        defaultValue={props?.value}
      />
    ),
    [DataTypes.date]: (
      <DatePickerInput
        placeholder={props.attName}
        onChange={props.onChange}
        name={props.attName}
        defaultValue={props?.value}
        disabled={props.readonly}
      />
    ),
  };
  return (
    <DefaultView style={{flex: 1, width: '100%'}}>
      {inputTypes[props.datatype]}
    </DefaultView>
  );
};

const style = StyleSheet.create({
  textInputContainer: {
    borderWidth: 0,
    borderRadius: 0,
    height: 48,
    width: '100%',
    flex: 1,
  },

  switchContainer: {
    display: 'flex',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
