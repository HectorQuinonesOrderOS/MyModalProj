import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScreenOrientation,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Video } from 'expo';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import VideoPlayer from '@expo/videoplayer';
import { fetchChEvents } from './redux/actions';
import { ChannelsURL } from './ChannelsURL';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      name: ''
    };
  }
    componentDidMount() {
    this.props.fetchChEvents();
  }
  render() {
    console.log(this.props.chEvents);
    const renderVideoPic = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            this.setState({
              isModalVisible: !this.state.isModalVisible,
              video: ChannelsURL + item.video
            })
          }
        >
          <View
                  style={[
                    { width: Dimensions.get('window').width / 2.2 },
                    { height: 250,
                      margin: 8
                  }]}
                >
                    <Image
                      square
                      source={{ uri: ChannelsURL + item.image }}
                      key={index}
                      style={{
                        flex: 1,
                        height: undefined,
                        width: undefined,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#dddddd'
                      }}
                    />
          </View>
        </TouchableOpacity>
      );
    };

    if (this.props.chEvents.isChLoading) {
      return (
         <View style={styles.container}>
              <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
          </View>
      );
    }
    else if (this.props.chEvents.errChMess) {
      return (
        <View>
          <Text>{this.props.chEvents.errChMess}</Text>
        </View>
      );
    }
    else {
      return (
        <SafeAreaView forceInset={{ bottom: 0 }} style={{ flex: 1 }}>
          <FlatList
            data={this.props.chEvents.chEvents}
            renderItem={renderVideoPic}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            numColumns={2}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
          />
          <Modal
            isVisible={this.state.isModalVisible}
            propagateSwipe
            animationOut='slideOutDown'
            backdropOpacity={1}
            backdropColor='white'
            style={{
              justifyContent: 'center',
              margin: 0,
              alignItems: 'center',
              ...ifIphoneX({
                paddingTop: 30
              }, {
                paddingTop: 0
              })
            }}
            onSwipe={() => this.setState({ isModalVisible: false })}
            swipeDirection='down'
            supportedOrientations={['portrait', 'landscape']}
          >
            <VideoPlayer
              videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                isMuted: false,
                source: {
                  uri: this.state.video,
                },
              }}
                isPortrait
                playFromPositionMillis={0}
                showFullscreenButton
                switchToLandscape={() => ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)}
                switchToPortrait={() => ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.props.chEvents.chEvents}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) =>
                <View>
                  <View
                      style={{
                          height: 100,
                          width: 80,
                          borderWidth: 0.5,
                          borderColor: '#dddddd',
                          marginTop: 10,
                          marginLeft: 13,
                          marginBottom: 15,
                          borderRadius: 5,
                          backgroundColor: '#F2F2F2'

                          }}
                  >
                      <View style={{ flex: 2 }}>
                          <Image
                              square
                              source={{ uri: ChannelsURL + item.image }}
                              style={{
                                  flex: 1,
                                  width: null,
                                  height: null,
                                  resizeMode: 'cover',
                                  borderRadius: 5
                                  }}
                          />
                      </View>
                  </View>
                </View>
              }
            />

          </Modal>

        </SafeAreaView>


      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchChEvents: () => dispatch(fetchChEvents()),
});

const mapStateToProps = state => {
  return {
    chEvents: state.chEvents
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  gradientBottom: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width / 2.2,
    height: 250,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  gradientTop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width / 2.2,
    height: 250,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  thumbnailOuter: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5
  },
  thumpnailImage: {
    position: 'absolute',
    height: 33,
    width: 33,
    borderRadius: 15,
    resizeMode: 'cover',
    backgroundColor: '#D8D8D8',
  }
});
