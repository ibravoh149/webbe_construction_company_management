import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Button, Form, FormGroup, SelectInput, TextInput} from '../Common';
import {Text, View} from '../Themed';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../Hooks/useRedux';
import {onAddAttribute} from '../../redux/Slices/categories.slice';
import {IAttributetypes} from '../../interface';
import { DataTypes } from '../../constants/enum';

export const NewAttributeCard = ({
  category,
  onComplete,
}: {
  category: string;
  onComplete?: () => void;

}) => {
  const dispatch = useAppDispatch();

  const schema = yup.object({
    attributeName: yup.string().required('required').min(2),
    dataType: yup.string().required('required'),
  });
  const {
    control,
    formState: {errors},
    reset,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      attributeName: '',
      dataType: '',
    },
  });
  const onSubmit = (values: any) => {
    const payload: IAttributetypes = {
      key: values.attributeName,
      categoryId: category,
      dataType: values.dataType,
    };
    onComplete?.()
    dispatch(onAddAttribute(payload));
  };
  const attributeOptions = [
    {label: 'Date', value: DataTypes.date},
    {label: 'Number', value: DataTypes.number},
    {label: 'Checkbox', value: DataTypes.checkbox},
    {label: 'Text', value: DataTypes.text},
  ];
  
  return (
    <Form>
      <Text style={style.title}>Add Attribute</Text>
      <FormGroup>
        <TextInput
          control={control}
          name="attributeName"
          label="Attribute Name"
          placeholder="Enter name of attribute"
          error={errors?.attributeName?.message as string}
        />
      </FormGroup>
      <FormGroup>
        <SelectInput
          control={control}
          name="dataType"
          label="Type"
          onChange={(name, value) =>
            reset({
              ...getValues(),
              [name]: value,
            })
          }
          options={attributeOptions}
          error={errors?.dataType?.message as string}
          defaultValue="Please select"
        />
      </FormGroup>

      <FormGroup>
        <Button title="Add" onPress={handleSubmit(onSubmit)} />
      </FormGroup>
    </Form>
  );
};

const style = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'MMedium',
    fontSize: 18,
    marginBottom: 10,
  },
});
