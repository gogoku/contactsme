import React from 'react';
import {ScrollView} from 'react-native';
import {Button, StyleService, useStyleSheet} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ProfileSetting} from './extra/profile-setting.component';
import {CameraIcon} from './extra/icons';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../index';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [profile, setUserDetails] = React.useState<object>({});

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon}
    />
  );

  React.useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      setUserDetails(JSON.parse(user));
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <AuthContext.Consumer>
        {(auth) => (
          <>
            <ProfileAvatar
              style={styles.profileAvatar}
              source={profile.photo}
              editButton={renderPhotoButton}
            />
            <ProfileSetting
              style={[styles.profileSetting, styles.section]}
              hint="First Name"
              value={profile.firstname}
            />
            <ProfileSetting
              style={styles.profileSetting}
              hint="Last Name"
              value={profile.lastname}
            />
            <ProfileSetting
              style={[styles.profileSetting, styles.section]}
              hint="Email"
              value={profile.email}
            />
            <ProfileSetting
              style={styles.profileSetting}
              hint="Phone Number"
              value={profile.phoneNumber}
            />
            {/* <Button style={styles.doneButton} onPress={onDoneButtonPress}>
        DONE
      </Button> */}
            <Button
              style={styles.signUpButton}
              appearance="ghost"
              size="giant"
              status="basic"
              onPress={auth.signOut}>
              Log Out
            </Button>
          </>
        )}
      </AuthContext.Consumer>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
