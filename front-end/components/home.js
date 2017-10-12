import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import { MapView, Polyline } from "expo";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      return error;
    }
  }

  loadingScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.loadingScreen}>
          <Image
            source={require("../images/smooth_animation.gif")}
            style={styles.animation}
          />
        </View>
      </View>
    );
  }

  render() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);

    if (this.state.loading) {
      return this.loadingScreen();
    } else {
      return (
        <View style={styles.test}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
          <TextInput style={styles.directionInput} />
        </View>
      );
    }
  }
}

var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D8DFF",
    alignItems: "center",
    justifyContent: "center"
  },
  test: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  directionInput: {
    width: width * 0.92,
    height: 55,
    borderRadius: 1,
    position: "absolute",
    top: 65,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20
  },
  loadingScreen: {
    flex: 0.1,
    paddingBottom: 50
  },
  animation: {
    flex: 1
  }
});
