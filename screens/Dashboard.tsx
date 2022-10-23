import {useFocusEffect} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {SectionList} from 'react-native';
import {SafeAreaView, Text, View} from '../components';
import {MachineCard} from '../components/Machine';
import {useAppSelector} from '../Hooks/useRedux';

export const Dashboard = () => {
  const [sections, setSections] = useState<any[]>([]);

  const {
    Category: {categories},
    Machine: {machines},
  } = useAppSelector(state => state);

  const groupSection = () => {
    const grouped = categories.map(category => {
      return {
        title: category.title || 'Unnamed Category',
        data: machines?.[category?.id] || [],
      };
    });
    setSections(grouped);
  };

  useFocusEffect(
    React.useCallback(() => {
      groupSection();
    }, [categories]),
  );
  const renderItem = ({item, index}: {[key: string]: any; index: number}) => {
    return <MachineCard categoryId={item.categoryId} machineId={item.id} readonly values={item.values} />;
  };

  const memonizedRender = useMemo(() => renderItem, [sections]);

  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
        <SectionList
          sections={sections as any[]}
          keyExtractor={(item, index) => item + index}
          renderItem={memonizedRender}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                backgroundColor: '#F6F8FA',
                height: 48,
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: 5,
                marginBottom:10
              }}>
              <Text>{title}</Text>
            </View>
          )}
          stickySectionHeadersEnabled
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <>
              <Text>Nothing to show</Text>
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};
