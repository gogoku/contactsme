import React from 'react';
import {StyleSheet, View, ViewStyle, Platform, Linking} from 'react-native';
import {
  Avatar,
  ListItem,
  ListItemProps,
  Text,
  Icon,
  Button,
} from '@ui-kitten/components';
import * as RNLocalize from 'react-native-localize';
import {utcToZonedTime, format} from 'date-fns-tz';
import {formatISO} from 'date-fns';

const PinIcon = (props) => <Icon {...props} name="pin" />;

export const ContactItem = (props): React.ReactElement => {
  const {data, ...listItemProps} = props;

  const openInMaps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${data.location.latitude},${data.location.longitude}`;
    const label = '';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  // const renderMessageDate = (
  //   style: ViewStyle,
  //   index: number,
  // ): React.ReactElement => (
  //   <Button
  //     appearance="ghost"
  //     size="medium"
  //     status="primary"
  //     accessoryLeft={PinIcon}
  //     onPress={openInMaps}
  //   />
  //   // <Icon name="pin" />
  //   //   {/* <Text style={styles.dateText} appearance="hint" category="c1">
  //   //     {'loc'}
  //   //   </Text> */}
  // );

  const renderMessageDate = (
    style: ViewStyle,
    index: number,
  ): React.ReactElement => {
    const IsoString = new Date(
      Date.UTC(...data.timestamp.split(/[\s-:]/)),
    ).toISOString();
    const IsoDate = utcToZonedTime(IsoString, RNLocalize.getTimeZone());
    const displayDate = format(IsoDate, 'yyyy-MM-dd h:m aaaa', {
      timeZone: RNLocalize.getTimeZone(),
    });
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText} appearance="hint" category="c1">
          {displayDate}
        </Text>
        <Button
          appearance="ghost"
          size="medium"
          status="primary"
          accessoryLeft={PinIcon}
          onPress={openInMaps}
        />
      </View>
    );
  };

  //   const renderProfileAvatar = (): React.ReactElement => (
  //     <Avatar style={styles.avatar} source={message.profile.photo} />
  //   );

  return (
    <ListItem
      {...listItemProps}
      title={data.full_name}
      description={data.phone}
      //   icon={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});
