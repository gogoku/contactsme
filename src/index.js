import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator, {LoginNavigator} from './config/routes';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import RootReducer from './reducers';
import {AppIconsPack} from './app-icons-pack';

// const store = createStore(RootReducer);

export const AuthContext = React.createContext();

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('user').jwt;
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await AsyncStorage.setItem('user', JSON.stringify(data));
        dispatch({type: 'SIGN_IN', token: 'data.jwt'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await AsyncStorage.setItem('user', JSON.stringify(data));
        dispatch({type: 'SIGN_IN', token: 'data.jwt'});
      },
    }),
    [],
  );

  return (
    <>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={{...eva.light}}>
        <AuthContext.Provider value={authContext}>
          {/* <Provider store={store}> */}
          {state.userToken == null ? <LoginNavigator /> : <AppNavigator />}
          {/* </Provider> */}
        </AuthContext.Provider>
      </ApplicationProvider>
    </>
  );
}

// import React from 'react';
// import {ApplicationProvider} from '@ui-kitten/components';
// import * as eva from '@eva-design/eva';

// import AppNavigator from './config/routes';

// export default () => (
//   <ApplicationProvider {...eva} theme={{...eva.dark}}>
//     <AppNavigator />
//   </ApplicationProvider>
// );
