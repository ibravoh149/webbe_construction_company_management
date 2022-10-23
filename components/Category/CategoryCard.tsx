import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View as DefaultView,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import {Text, View} from '../Themed';
import {MaterialIcons, EvilIcons} from '@expo/vector-icons';
import {Form, TextInput} from '../Common';
import {useForm} from 'react-hook-form';
import {BottomSheetModal} from '../Modal';
import {NewAttributeCard} from './AddAttributeCard';
import {ICategoryItem} from '../../interface';
import {useAppDispatch, useAppSelector} from '../../Hooks/useRedux';
import {
  removeAtt,
  removeCategory,
  setCategoryName,
  setDefaultTitle,
} from '../../redux/Slices/categories.slice';
import useDebounce from '../../Hooks/useDebounce';

export const AttributeCard = ({
  attributeName,
  dataType,
  category,
  index,
  isSetAsDefaultTitle,
}: {
  attributeName?: string;
  dataType?: string;
  category?: string;
  index?: number;
  isSetAsDefaultTitle?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const onRmove = () => {
    dispatch(
      removeAtt({
        itemIndex: index,
        category,
      }),
    );
  };

  return (
    <DefaultView style={{marginTop: 5}}>
      {isSetAsDefaultTitle && (
        <Text style={{color: Colors.light.tint}}>{'Default title'}</Text>
      )}
      <DefaultView style={style.fieldContainer}>
        <View>
          <Text
            lightColor={Colors.light.textPrimary}
            darkColor={Colors.dark.textPrimary}>
            Attribute Name
          </Text>
          <Text style={style.attrValue}>{attributeName}</Text>
        </View>

        <View>
          <Text
            lightColor={Colors.light.textPrimary}
            darkColor={Colors.dark.textPrimary}>
            Attribute Type
          </Text>
          <Text style={style.attrValue}>{dataType}</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity style={style.settingBtn} onPress={onRmove}>
            <EvilIcons name="trash" size={25} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>
      </DefaultView>
    </DefaultView>
  );
};

export const CategoryCard = (props: ICategoryItem & {index: number}) => {
  const {id, title, index} = props;
  const [containerWidth, setContainerWith] = useState(0);
  const {control, watch} = useForm();
  const [showAdd, setShowAdd] = useState(false);
  const dispatch = useAppDispatch();
  const {
    Category: {attributes, defaultTitles},
  } = useAppSelector(state => state);

  const values = watch();
  const debounced = useDebounce(values.title, 200);
  const toggleShowAdd = () => setShowAdd(!showAdd);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  const toggleTitleDropdown = () => setShowTitleDropdown(!showTitleDropdown);

  useEffect(() => {
    dispatch(setCategoryName({itemIndex: index, value: values.title}));
  }, [debounced]);

  const onRemoveCategory = () => {
    dispatch(removeCategory(id));
  };

  const renderItem = ({item, index}: {[key: string]: any; index: number}) => {
    return (
      <AttributeCard
        {...item}
        attributeName={item.key}
        index={index}
        category={id}
        isSetAsDefaultTitle={
          defaultTitles?.[id]?.toLowerCase() === item.key.toLowerCase()
        }
      />
    );
  };

  return (
    <View
      style={style.container}
      onLayout={e => setContainerWith(e.nativeEvent.layout.width)}>
      <View style={style.titleContainer}>
        <Text
          style={{textAlign: 'center', color: 'white', fontFamily: 'MMedium'}}>
          {title || 'Unnamed Category'}
        </Text>
        <TextInput
          defaultValue={title || ''}
          control={control}
          name="title"
          placeholder="Enter Category name"
          style={{
            backgroundColor: '#0C0B2F',
            borderWidth: 0,
            borderRadius: 0,
            color: 'white',
          }}
          placeholderTextColor="#C1C7D0"
          selectionColor={'white'}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={attributes[id]}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={toggleShowAdd}
          style={[style.btn, style.btn1, {width: (containerWidth - 17) / 3}]}>
          <View style={style.btnIcon}>
            <MaterialIcons name="add-circle" size={12} color="white" />
          </View>
          <Text style={[style.btnText, {color: 'white'}]}>Add Field</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTitleDropdown}
          style={[style.btn, style.btn2, {width: (containerWidth - 17) / 3}]}>
          <Text style={[style.btnText, {color: Colors.light.tint}]}>
            Default Title
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRemoveCategory}
          style={[style.btn, style.btn2, {width: (containerWidth - 17) / 3}]}>
          <View
            style={[style.btnIcon, {backgroundColor: 'rgba(5, 191, 4, 0.12)'}]}>
            <EvilIcons name="trash" size={12} color={Colors.light.tint} />
          </View>
          <Text style={[style.btnText, {color: Colors.light.tint}]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
        <BottomSheetModal visible={showAdd} onRequestClose={toggleShowAdd}>
          <NewAttributeCard category={id} onComplete={toggleShowAdd} />
        </BottomSheetModal>

      <BottomSheetModal
        visible={showTitleDropdown}
        onRequestClose={toggleTitleDropdown}>
        <Text
          style={{fontFamily: 'MMedium', fontSize: 18, textAlign: 'center'}}>
          Select Default Title for Machines
        </Text>

        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={style.attList}
              onPress={() => {
                dispatch(setDefaultTitle({categoryId: id, value: item.key}));
                toggleTitleDropdown();
              }}>
              <Text>{item.key}</Text>
            </TouchableOpacity>
          )}
          data={attributes[id]}
        />
      </BottomSheetModal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    // borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#C1C7D0',
    // padding: 10,
    paddingBottom: 10,
    width: '100%',
    marginBottom: 10,
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
  attList: {
    backgroundColor: '#C1C7D0',
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
});
