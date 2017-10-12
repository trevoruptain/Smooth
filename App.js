import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      return coords
    } catch (error) {
      return error
    }
  }

  render() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000);

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingScreen}>
            <Image source={require('./images/smooth_animation.gif')}
                   style={styles.animation} />
          </View>
        </View>
      );
    } else {
      return (
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D8DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingScreen: {
    flex: 0.1,
    paddingBottom: 50
  },
  animation: {
    flex: 1,
  },
});
