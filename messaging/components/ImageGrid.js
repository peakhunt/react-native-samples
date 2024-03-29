import {
  Image,
  StyleSheet,
  TouchableOpacity 
} from 'react-native';

import { CameraRoll } from "react-native";
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {
  loading = false;
  cursor = null;

  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  state = {
    images: [],
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const { onPressImage } = this.props;

    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
       key={uri}
       activeOpacity={0.75}
       onPress={() => onPressImage(uri)}
       style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async (after) => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    if (this.loading) return;

    this.loading = true;

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const { edges, page_info: { has_next_page, end_cursor } } = results;
    const loadedImages = edges.map(item => item.node.image);

    this.setState(
      {
        images: this.state.images.concat(loadedImages),
      },
      () => {
        this.loading = false;
        this.cursor = has_next_page ? end_cursor : null;
      },
    );
  };

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  render() {
    const { images } = this.state;

    return (
      <Grid
       data={images}
       renderItem={this.renderItem}
       keyExtractor={keyExtractor}
       onEndReached={this.getNextImages}
      />
    );
  }
};

const styles = StyleSheet.create({

  image: {
    flex: 1,
  },
});
