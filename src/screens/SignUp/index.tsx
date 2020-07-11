import React from 'react';
import {View} from 'react-native';
import {
  Button,
  CheckBox,
  Datepicker,
  Divider,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import AlertBox from '../../components/Alert';
import {
  ArrowForwardIconOutline,
  FacebookIcon,
  GoogleIcon,
  HeartIconFill,
  TwitterIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {signUpApi} from '../../utils/api';
import {AuthContext} from '../../index';
import LoadingIndicator from '../../components/Spinner';

export default ({navigation}): React.ReactElement => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [errorState, setErrorState] = React.useState<boolean>({});
  const [signupAlert, setsignupAlert] = React.useState<string>('');

  const styles = useStyleSheet(themedStyles);

  const hideAlert = (): void => {
    setsignupAlert(false);
  };

  const showAlert = (mess): void => {
    setsignupAlert(mess);
  };

  const onSignUpButtonPress = async (value): void => {
    validateInput('', true);
    setLoading(true);
    let data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password,
    };
    const result = await signUpApi(data);
    if (result.error) {
      if (result.err.response && result.err.response.status === 406) {
        showAlert('User already exists please Sign In');
      } else {
        showAlert('Please verify the details entered');
      }
    } else {
      value.signUp(result.response.data.data);
    }
    setLoading(false);
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Login');
  };

  const emailValidation = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const validateInput = (name: string, validateAll: boolean): void => {
    let currErrorState = {
      ...errorState,
    };
    if (name === 'firstName' || validateAll) {
      if (firstName.length === 0) {
        currErrorState.firstName = true;
      } else {
        currErrorState.firstName = false;
      }
    }
    if (name === 'lastName' || validateAll) {
      if (lastName.length === 0) {
        currErrorState.lastName = true;
      } else {
        currErrorState.lastName = false;
      }
    }
    if (name === 'email' || validateAll) {
      if (!emailValidation(email)) {
        currErrorState.email = true;
      } else {
        currErrorState.email = false;
      }
    }
    if (name === 'password' || validateAll) {
      if (password.length < 8) {
        currErrorState.password = true;
      } else {
        currErrorState.password = false;
      }
    }
    setErrorState(currErrorState);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <AlertBox
        visible={!!signupAlert}
        title={signupAlert}
        onHide={hideAlert}
      />
      <AuthContext.Consumer>
        {(value) => (
          <>
            {/* <ImageOverlay
              style={styles.headerContainer}
              source={require('./assets/background.jpg')}> */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signInLabel} category="h4" status="control">
                SIGN UP
              </Text>
              <Button
                style={styles.signInButton}
                appearance="ghost"
                status="basic"
                size="giant"
                accessoryLeft={ArrowForwardIconOutline}
                onPress={onSignInButtonPress}>
                Sign In
              </Button>
            </View>
            {/* </ImageOverlay> */}
            <View style={styles.socialAuthContainer}>
              <Text style={styles.socialAuthHintText}>
                Sign with a social account
              </Text>
              <View style={styles.socialAuthButtonsContainer}>
                <Button
                  appearance="ghost"
                  size="giant"
                  status="basic"
                  accessoryLeft={GoogleIcon}
                />
                <Button
                  appearance="ghost"
                  size="giant"
                  status="basic"
                  accessoryLeft={FacebookIcon}
                />
                <Button
                  appearance="ghost"
                  size="giant"
                  status="basic"
                  accessoryLeft={TwitterIcon}
                />
              </View>
            </View>
            <View style={styles.orContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.orLabel} category="h5">
                OR
              </Text>
              <Divider style={styles.divider} />
            </View>
            <Text style={styles.emailSignLabel}>Sign up with Email</Text>
            <View style={[styles.container, styles.formContainer]}>
              <Input
                placeholder="John"
                label="NAME"
                autoCapitalize="words"
                value={firstName}
                status={errorState.firstName ? 'danger' : 'basic'}
                onChangeText={setFirstName}
                onBlur={() => validateInput('firstName')}
              />
              <Input
                style={styles.formInput}
                placeholder="Doe"
                label="LAST NAME"
                autoCapitalize="words"
                value={lastName}
                onChangeText={setLastName}
                status={errorState.lastName ? 'danger' : 'basic'}
                onBlur={() => validateInput('lastName')}
              />
              <Input
                style={styles.formInput}
                placeholder="john.doe@gmail.com"
                label="EMAIL"
                value={email}
                onChangeText={setEmail}
                status={errorState.email ? 'danger' : 'basic'}
                caption={errorState.email ? 'Enter valid email' : ''}
                onBlur={() => validateInput('email')}
              />
              <Input
                style={styles.formInput}
                label="PASSWORD"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                status={errorState.password ? 'danger' : 'basic'}
                caption={'Should contain at least 8 characters'}
                onBlur={() => validateInput('password')}
              />
              <CheckBox
                style={styles.termsCheckBox}
                textStyle={styles.termsCheckBoxText}
                checked={termsAccepted}
                onChange={(checked: boolean) => setTermsAccepted(checked)}>
                By creating an account, I agree to the Terms of Use and Privacy
                Policy
              </CheckBox>
            </View>
            <Button
              style={styles.signUpButton}
              size="large"
              onPress={() => onSignUpButtonPress(value)}
              accessoryLeft={isLoading && LoadingIndicator}
              disabled={isLoading}>
              SIGN UP
            </Button>
          </>
        )}
      </AuthContext.Consumer>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  signInLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthIcon: {
    tintColor: 'text-basic-color',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 42,
  },
  divider: {
    flex: 1,
  },
  orLabel: {
    marginHorizontal: 8,
  },
  emailSignLabel: {
    alignSelf: 'center',
    marginTop: 8,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: 'text-hint-color',
  },
});
