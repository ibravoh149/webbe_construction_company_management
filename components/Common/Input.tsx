/**
 * Learn more about Light and Dark modes:
 */

import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput as DefaultTextInput,
  View as DefaultView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../constants/Colors';
import {Text, View} from '../Themed';
import {ThemeProps} from '../../types';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useController} from 'react-hook-form';
import {useThemeColor} from './Button';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import {EvilIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';

type Props = {
  error?: string;
  label?: string;
  isSecret?: boolean;
  // onRevealInputClick?: () => void;
  control?: any;
  name?: string;
  defaultValue?: string;
  labelStyle?: StyleProp<TextStyle>;
  transformValue?: (value: any) => any;
  showLoader?: boolean;
};
// Control<FieldValues, any>
export type InputProps = Props & ThemeProps & DefaultTextInput['props'];

export function TextInput(props: InputProps) {
  const [secureText, setSecureText] = useState(props.secureTextEntry);
  const {field} = useController({
    control: props?.control as any,
    defaultValue: props.defaultValue as string,
    name: props.name as string,
  });
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: props.lightColor, dark: props.darkColor},
    'background',
  );
  const toggleSecureText = () => setSecureText(!secureText);

  const onTextChange = (values: any) => {
    // field.onChange(values);
    // props.transformValue?.(values)
    if (props.transformValue) {
      field.onChange(props.transformValue(values));
    } else {
      field.onChange(values);
    }
  };

  // const onBlur=()=>{
  //   // props?.onBlur?.()
  //   console.log("blurred")
  // }

  return (
    <DefaultView>
      {props.label && (
        <Text
          lightColor={Colors.light.textPrimary}
          darkColor={Colors.dark.textPrimary}
          style={[styles.label, props.labelStyle]}>
          {props.label}
        </Text>
      )}
      <View style={{position: 'relative'}}>
        <DefaultTextInput
          style={[
            {backgroundColor},
            {
              ...styles.container,
              borderColor: props.error ? 'red' : '#b8b8d2',
              color: Colors.light.text,
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
            style,
          ]}
          value={field.value}
          onChangeText={onTextChange}
          // onBlur={onBlur}
          {...otherProps}
          secureTextEntry={secureText as boolean}
          selectionColor={Colors.light.tint}
        />

        {props.isSecret && (
          <>
            <View style={{position: 'absolute', zIndex: 5, right: 10, top: 12}}>
              {secureText ? (
                <AntDesign
                  name="eyeo"
                  size={23}
                  color={Colors.light.textPrimary}
                  onPress={toggleSecureText}
                />
              ) : (
                <Feather
                  name="eye-off"
                  size={23}
                  color={Colors.light.textPrimary}
                  onPress={toggleSecureText}
                />
              )}
            </View>
          </>
        )}

        {props.showLoader && (
          <>
            <View style={{position: 'absolute', zIndex: 5, right: 10, top: 15}}>
              <ActivityIndicator color={Colors.light.tint} size={23} />
            </View>
          </>
        )}
      </View>

      {props.error && (
        <Text lightColor="red" darkColor="red">
          {props.error}
        </Text>
      )}
    </DefaultView>
  );
}

/** for datepicker use only*/

type DatePickerProp = {
  name?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?:boolean

  onChange?: (name: string, value?: string) => void;
};
export function DatePickerInput(props: DatePickerProp) {
  const [date, setDate] = useState(
    props.defaultValue
      ? new Date(moment(props.defaultValue).format('YYYY-MM-DD'))
      : new Date(),
  );
  const [show, setShow] = useState(false);
  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    if (currentDate) {
      props.onChange?.(
        props.name as string,
        moment(currentDate).format('DD-MM-YYYY'),
      );
      setDate(currentDate);
    }
  };
  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <DefaultView>
      <TouchableOpacity
        onPress={() => setShow(true)}
        disabled={props.disabled}
        style={{
          height: 48,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}>
        <DefaultTextInput
          editable={false}
          value={date ? moment(date).format('DD-MM-YYYY') : ''}
          // onPressIn={showDatepicker}
          style={{color: Colors.light.text}}
          placeholder={`Select ${props.placeholder}`}
          defaultValue={props.defaultValue}
        />
        <EvilIcons name="calendar" size={24} color="#677684" />
      </TouchableOpacity>

      <DatePicker
        modal
        open={show}
        date={date}
        onConfirm={date => {
          setShow(false);
          onChange(date);
        }}
        onCancel={() => {
          setShow(false);
        }}
        mode="date"
      />
    </DefaultView>
  );
}
/** for datepicker use only*/

/** for datepicker use only*/

type SelectInputProps = {
  control?: any;
  name?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string;
  onChange?: (name: string, value?: string) => void;
  options?: {label: string; value?: string}[];
  defaultValue?: string;
};
export function SelectInput(props: SelectInputProps) {
  return (
    <DefaultView style={{flex: 1}}>
      {props.label && (
        <Text
          lightColor={Colors.light.textPrimary}
          darkColor={Colors.dark.textPrimary}
          style={[styles.label, props.labelStyle]}>
          {props.label}
        </Text>
      )}

      <Controller
        name={props.name as string}
        control={props.control}
        render={({field}) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: props.error ? 'red' : '#b8b8d2',
              borderRadius: 4,
            }}>
            {Platform.select({
              android: (
                <Picker
                  //   mode="dropdown" // Android only
                  style={{height: 48, width: '100%'}}
                  selectedValue={field.value}
                  onValueChange={(itemValue, itemIndex) =>
                    props.onChange?.(props.name as string, itemValue)
                  }>
                  {props.defaultValue && (
                    <Picker.Item
                      label={props.defaultValue}
                      value={''}
                      style={{fontFamily: 'Montserrat', fontSize: 16}}
                    />
                  )}
                  {props?.options?.map((item, idx) => (
                    <Picker.Item
                      key={idx}
                      label={item.label}
                      value={item.value}
                      style={{fontFamily: 'Montserrat', fontSize: 16}}
                    />
                  ))}
                </Picker>
              ),
              ios: (
                <SelectDropdown
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: 48,
                  }}
                  data={props.options as any[]}
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem.value, index);
                    props.onChange?.(props.name as string, selectedItem.value);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.label;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.value;
                  }}
                  defaultValue={props.defaultValue}
                  defaultButtonText={props.defaultValue}
                  buttonTextStyle={{
                    textAlign: 'left',
                    fontFamily: 'Montserrat',
                    fontSize: 16,
                  }}
                />
              ),
            })}
          </View>
        )}
      />
      {props.error && (
        <Text lightColor="red" darkColor="red">
          {props.error}
        </Text>
      )}
    </DefaultView>
  );
}
/** for datepicker use only*/

/** form group, main purpose is to create a margin between one form input and another */
interface IFormGroup {
  children?: React.ReactNode;
  // style?: StyleProp<ViewStyle>;
}

export function FormGroup(props: IFormGroup & DefaultView['props']) {
  const {style, ...others} = props;
  return (
    <DefaultView style={[styles.formGroup, style]} {...others}>
      {props.children}
    </DefaultView>
  );
}

/** form group, main purpose is to create a margin between one form input and another */

/** form, main purpose is to make form scrollable when input is forcussed */

interface IFormProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  ScrollProps?: ScrollView['props'];
  KeyboardAvoidingViewProps?: KeyboardAvoidingView['props'];
}
export function Form(props: IFormProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: 'height',
      })}
      {...props.KeyboardAvoidingViewProps}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...props.ScrollProps}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
/** form, main purpose is to make form scrollable when input is forcussed */

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 48,
    paddingHorizontal: 20,
    // flex: 1,
  },

  label: {
    fontSize: 14,
    color: '#858597',
    marginBottom: 8,
  },

  formGroup: {
    marginBottom: 12,
  },

  phoneInputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C1C7D0',
    borderRadius: 4,
    // paddingVertical:-5
    // backgroundColor: 'transparent',
    height: 50,
    // minHeight: 48,
  },
});
