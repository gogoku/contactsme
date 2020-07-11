import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Layout,
  Modal,
  Text,
  Divider,
} from '@ui-kitten/components';

const Footer = (props) => (
  <Button appearance="ghost" size="medium" onPress={props.onHide}>
    DISMISS
  </Button>
);

export default function AlertBox(props) {
  return (
    <Layout style={styles.container} level="1">
      <Modal
        visible={props.visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={props.onHide}>
        <Card disabled={true}>
          <View style = {styles.messageContainer}>
            <Text>{props.title}</Text>
          </View>
          <Divider />
          <Button appearance="ghost" size="medium" onPress={props.onHide}>
            DISMISS
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  messageContainer: {
      paddingBottom: 32,
      paddingTop: 8
  }
});
