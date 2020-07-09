import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Layout} from '@ui-kitten/components';

import HomeScreen from '../screens/Home';
import DetailsScreen from '../screens/Details';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const {Navigator, Screen} = createStackNavigator();

function HomeNavigator() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeScreen} />
      <Screen
        name="Details"
        component={DetailsScreen}
        options={{title: 'details'}}
      />
    </Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

export default AppNavigator;

function PreLoginNavigator() {
  return (
    <Navigator headerMode="none">
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}

export const LoginNavigator = () => (
  <NavigationContainer>
    <PreLoginNavigator />
  </NavigationContainer>
);
