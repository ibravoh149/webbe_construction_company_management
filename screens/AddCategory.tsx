import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, FlatList, Platform} from 'react-native';
import {Button, CategoryCard, Form, SafeAreaView, View} from '../components';

import {nanoid} from 'nanoid';
import {useAppDispatch, useAppSelector} from '../Hooks/useRedux';
import {ICategoryItem} from '../interface';
import {onAddCategory} from '../redux/Slices/categories.slice';

export const AddCategory = () => {
  const {
    Category: {categories},
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const scrollViewRef = React.useRef<any>();

  const renderItem = ({item, index}: {[key: string]: any; index: number}) => {
    return <CategoryCard {...item} index={index} />;
  };

  const memonizedRender = useMemo(() => renderItem, [categories]);
  const [lastItemCount, setLastItemCount] = useState(0);

  const addCategory = () => {
    const payload: ICategoryItem = {
      id: nanoid(10),
    };
    dispatch(onAddCategory(payload));
  };

  const trackLastItemCount = (currentLength: number) => {
    if (currentLength > lastItemCount) {
      scrollViewRef.current.scrollToEnd({animated: true});
      setLastItemCount(lastItemCount + 1);
    } else {
      setLastItemCount(currentLength);
    }
  };

  return (
    <SafeAreaView>
      <View style={{flex: 1, paddingBottom: 50}}>
        <FlatList
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
          data={categories}
          onContentSizeChange={() => trackLastItemCount(categories.length)}
          ref={scrollViewRef}
        />
      </View>

      <View style={style.addBtnContainer}>
        <Button title="Add Category" onPress={addCategory} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  addBtnContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
