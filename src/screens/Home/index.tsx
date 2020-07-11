import React from 'react';
import {View, ListRenderItemInfo, ImageStyle} from 'react-native';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  List,
  IconElement,
  Icon,
  useTheme,
  Text,
} from '@ui-kitten/components';
import {ContactItem} from './extra/ListComponent';
import {KeyboardAvoidingView} from './extra/3rd-party';
import Slider from '@react-native-community/slider';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {fetchContacts, addContact} from '../../utils/api';

export const SearchIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="search" />
);

export default ({navigation}): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [contactsList, setContacts] = React.useState<object>(null);
  const [number, setNumber] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [selectedRange, setSelectedRange] = React.useState<number>(5);

  const onAddButtonPress = (): void => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const data = {
          full_name: name,
          phone: number,
          location: {
            latitude: `${position.coords.latitude}`,
            longitude: `${position.coords.longitude}`,
          },
        };
        const result = await addContact(data);
        if (result.error) {
        } else {
          getContactsList(selectedRange);
        }
      },
      () => {},
      {enableHighAccuracy: true},
    );
  };

  const getContactsList = async (range) => {
    const result = await fetchContacts(range);
    if (result.error) {
      setContacts([]);
    } else {
      console.log(result.response.data.data);
      setContacts(result.response.data.data);
    }
  };

  // React.useEffect(async () => {
  //   if (contactsList === null) {
  //     getContactsList(selectedRange);
  //   }
  // }, []);

  React.useEffect(() => {
    (async () => getContactsList(selectedRange))();
  }, [selectedRange]);

  const renderItem = (info: ListRenderItemInfo): React.ReactElement => (
    <ContactItem style={styles.item} data={info.item} />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      {/* <Input placeholder="Search" value={searchQuery} icon={SearchIcon} /> */}
      <Text>Date Range - Last {selectedRange} day</Text>
      <Slider
        key="dayrangeSelector"
        style={{width: '100%', height: 40}}
        minimumValue={5}
        maximumValue={50}
        minimumTrackTintColor={theme['color-primary-default']}
        maximumTrackTintColor={theme['color-primary-300']}
        thumbTintColor={theme['color-primary-default']}
        onSlidingComplete={setSelectedRange}
        value={selectedRange}
        step={5}
      />
      <Divider />
    </Layout>
  );

  const onItemPress = (index: number): void => {
    navigation && navigation.navigate('Chat1');
  };

  return (
    // <KeyboardAvoidingView style={styles.container}>
    <Layout style={styles.form} level="1">
      <Input
        style={styles.input}
        label="Name"
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        label="Phone Number"
        placeholder="+91 "
        keyboardType="numeric"
        maxLength={19}
        value={number}
        onChangeText={setNumber}
      />
      <Divider />
      <Button style={styles.addButton} size="giant" onPress={onAddButtonPress}>
        ADD CONTACT
      </Button>
      <Divider />
      <List
        style={styles.list}
        data={contactsList}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </Layout>
    // </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    width: 128,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});