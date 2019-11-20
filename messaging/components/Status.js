import Constants  from 'expo-constants';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";

export default class Status extends React.Component {
  state = {
   info: null,
  };

  async componentWillMount() {
    const self = this;

    this.subscription =  NetInfo.addEventListener((s) => {
      self.setState({ info: s.type });
    });

    const s = await NetInfo.fetch();
    this.setState({ info: s.type });
  };

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
       translucent
       backgroundColor={backgroundColor}
       barStyle={isConnected ? 'dark-content' : 'light-content'}
       animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View> )
        }
      </View>
    );
    return <View style={[styles.status, { backgroundColor }]}>{messageContainer}</View>;
  }
};

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight);

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

