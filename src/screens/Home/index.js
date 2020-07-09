import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';

const HomeScreen = ({navigation}) => {
  console.log('home');
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <Text>tedst</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
