// Menu icon thanks to <div>Icons made by <a href="https://www.flaticon.com/authors/cole-bemis" title="Cole Bemis">Cole Bemis</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
// Menu from <a href="https://icons8.com">Icon pack by Icons8</a>
// Sliders from <a href="https://icons8.com">Icon pack by Icons8</a>

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
import Menu from "./menu/menu";

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
    }, 1000);

    if (this.state.loading) {
      return this.loadingScreen();
    } else {
      return (
        <View style={styles.test}>
          <Menu />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />

          <View style={styles.searchBox}>
            <View style={styles.button}>
              <Image
                source={require('../images/blue_menu_icon.png')}
                style={{width: 25, height: 27}}
                />
            </View>
            <TextInput style={styles.directionInput}/>
            <View style={styles.button}>
              <Image
                source={require('../images/blue_sliders.png')}
                style={{ width: 25, height: 30 }}
              />
             </View>
          </View>
        </View>
      );
    }
  }
}

var width = Dimensions.get("window").width;
var searchBoxWidth = width * .92;
var inputWidth = width * 0.62;
var buttonWidth = (searchBoxWidth - inputWidth) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D8DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: searchBoxWidth,
    height: 55,
    borderRadius: 3,
    position: 'absolute',
    top: 65,
    backgroundColor: 'white',

  },
  directionInput: {
    width: inputWidth,
    height: 55,
    // borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: buttonWidth,
    height: 55,
  },
  test: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingScreen: {
    flex: 0.1,
    paddingBottom: 50
  },
  animation: {
    flex: 1,
  },
});