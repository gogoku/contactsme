import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Divider,
} from '@ui-kitten/components';
import {RouteProp} from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import DetailsScreen from '../screens/Details';
import ProfileScreen from '../screens/Profile';

const {Navigator, Screen} = createStackNavigator();

const BottomTab = createBottomTabNavigator();

const HomeIcon = (props) => (
  <Icon
    style={{paddingHorizontal: 8, paddingVertical: 4}}
    {...props}
    name="home-outline"
  />
);

const CalendarIcon = (props) => (
  <Icon
    style={{paddingHorizontal: 8, paddingVertical: 4}}
    {...props}
    name="calendar-outline"
  />
);

const ProfileIcon = (props) => (
  <Icon
    style={{paddingHorizontal: 8, paddingVertical: 4}}
    {...props}
    name="person-outline"
  />
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

function HomeNavigator() {
  return (
    <Navigator headerMode="none">
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
}

function CalendarNavigator() {
  return (
    <Navigator headerMode="none">
      <Screen name="DetailsScreen" component={DetailsScreen} />
    </Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Navigator headerMode="none">
      <Screen name="ProfileScreen" component={ProfileScreen} />
    </Navigator>
  );
}

const ROOT_ROUTES: string[] = ['Home', 'Calendar', 'Profile'];

const TabBarVisibleOnRootScreenOptions = ({
  route,
}): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return {tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute)};
};

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined;
};

export const MainAppBottomNav = () => {
  const bottomState = useBottomNavigationState();

  return (
    <React.Fragment>
      <BottomTab.Navigator
        screenOptions={TabBarVisibleOnRootScreenOptions}
        initialRouteName={'Home'}
        tabBar={(props) => <BottomNav {...props} />}>
        <BottomTab.Screen name="Home" component={HomeNavigator} />
        <BottomTab.Screen name="Calendar" component={CalendarNavigator} />
        <BottomTab.Screen name="Profile" component={ProfileNavigator} />
      </BottomTab.Navigator>
    </React.Fragment>
  );
};

export const BottomNav = (props) => {
  const bottomState = useBottomNavigationState();
  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <React.Fragment>
      <Divider />
      <BottomNavigation selectedIndex={props.state.index} onSelect={onSelect}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={CalendarIcon} />
        <BottomNavigationTab icon={ProfileIcon} />
      </BottomNavigation>
    </React.Fragment>
  );
};
