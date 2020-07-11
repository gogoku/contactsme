import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text, Layout} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {ImageOverlay} from './extra/image-overlay.component';
import {
  ArrowForwardIcon,
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {loginApi} from '../../utils/api';
import {AuthContext} from '../../index';
import AlertBox from '../../components/Alert';

export default ({navigation, authDispatch}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [loginAlert, setLoginAlert] = React.useState<boolean>();

  const onSignInButtonPress = async (value): void => {
    const data = {
      email,
      password,
    };
    const result = await loginApi(data);
    const res = await AsyncStorage.getItem('user');
    if (result.error) {
      showAlert();
    } else {
      value.signIn(result.response.data.data);
    }
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const hideAlert = (): void => {
    setLoginAlert(false);
  };

  const showAlert = (): void => {
    setLoginAlert(true);
  };

  return (
    <KeyboardAvoidingView>
      <Layout style={styles.container}>
        <AlertBox
          visible={loginAlert}
          title="Incorrect Username or Password"
          onHide={hideAlert}
        />
        <AuthContext.Consumer>
          {(value) => (
            <>
              {/* <ImageOverlay
              style={styles.container}
              source={require('./assets/background.jpg')}> */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInLabel} category="h4">
                  SIGN IN
                </Text>
                <Button
                  style={styles.signUpButton}
                  appearance="ghost"
                  size="giant"
                  status="basic"
                  accessoryLeft={ArrowForwardIcon}
                  onPress={onSignUpButtonPress}>
                  Sign Up
                </Button>
              </View>
              <View style={styles.formContainer}>
                <Input
                  label="EMAIL"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  placeholder="Password"
                  label="PASSWORD"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <Button
                status="primary"
                size="large"
                onPress={() => onSignInButtonPress(value)}>
                SIGN IN
              </Button>
              <View style={styles.socialAuthContainer}>
                <Text style={styles.socialAuthHintText}>
                  Sign with a social account
                </Text>
                <View style={styles.socialAuthButtonsContainer}>
                  <Button
                    appearance="ghost"
                    size="giant"
                    accessoryLeft={GoogleIcon}
                  />
                  <Button
                    appearance="ghost"
                    size="giant"
                    accessoryLeft={FacebookIcon}
                  />
                  <Button
                    appearance="ghost"
                    size="giant"
                    accessoryLeft={TwitterIcon}
                  />
                </View>
              </View>
              {/* </ImageOverlay> */}
            </>
          )}
        </AuthContext.Consumer>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
