import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import {MainAppBottomNav} from './MainAppBottomNav';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <MainAppBottomNav />
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
