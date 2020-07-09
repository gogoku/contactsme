import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
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

export default ({navigation, authDispatch}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const onSignInButtonPress = async (value): void => {
    const data = {
      email,
      password,
    };
    const result = await loginApi(data);
    const res = await AsyncStorage.getItem('user');
    console.log(res);
    debugger;
    if (result.error) {
    } else {
      value.signIn(result.response.data.data);
    }
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  console.log(navigation, authDispatch);

  return (
    <KeyboardAvoidingView>
      <AuthContext.Consumer>
        {(value) => (
          <>
            <ImageOverlay
              style={styles.container}
              source={require('./assets/background.jpg')}>
              <View style={styles.signInContainer}>
                <Text style={styles.signInLabel} status="control" category="h4">
                  SIGN IN
                </Text>
                <Button
                  style={styles.signUpButton}
                  appearance="ghost"
                  status="control"
                  size="giant"
                  accessoryLeft={ArrowForwardIcon}
                  onPress={onSignUpButtonPress}>
                  Sign Up
                </Button>
              </View>
              <View style={styles.formContainer}>
                <Input
                  label="EMAIL"
                  placeholder="Email"
                  status="control"
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  placeholder="Password"
                  label="PASSWORD"
                  status="control"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <Button
                status="control"
                size="large"
                onPress={() => onSignInButtonPress(value)}>
                SIGN IN
              </Button>
              <View style={styles.socialAuthContainer}>
                <Text style={styles.socialAuthHintText} status="control">
                  Sign with a social account
                </Text>
                <View style={styles.socialAuthButtonsContainer}>
                  <Button
                    appearance="ghost"
                    size="giant"
                    status="control"
                    accessoryLeft={GoogleIcon}
                  />
                  <Button
                    appearance="ghost"
                    size="giant"
                    status="control"
                    accessoryLeft={FacebookIcon}
                  />
                  <Button
                    appearance="ghost"
                    size="giant"
                    status="control"
                    accessoryLeft={TwitterIcon}
                  />
                </View>
              </View>
            </ImageOverlay>
          </>
        )}
      </AuthContext.Consumer>
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
