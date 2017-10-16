// Menu from <a href="https://icons8.com">Icon pack by Icons8</a>
// Sliders from <a href="https://icons8.com">Icon pack by Icons8</a>

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  Dimensions,
  Link,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
// var Polyline = require('@mapbox/polyline');
import SplashLoading from "./loading_screens/splash_loading";
import PreferencesModal from "./preferences/preferences_modal";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      optionsDisplayed: false,
      destinationText: "",
      currPosition: { lat: 38, lng: -122.4 }
    };

    this.retrieveLocationInterval = 1000;
    this.setCurrLocation = this.setCurrLocation.bind(this);
    this._toggleOptions = this._toggleOptions.bind(this);
  }

  componentDidMount() {
    this.setCurrLocation();
    setInterval(() => {
      this.setCurrLocation();
    }, this.retrieveLocationInterval);
  }

  setCurrLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.setState({ currPosition: { lat, lng } });
    });
  }

  static navigationOptions = {
    header: null
  };

  fetchWaypoints(startLat, startLng, endLat, endLng, userPrefs) {
    fetch(`https://smooth.herokuapp.com/api/intersections?startLat=${startLat}&startLng=${startLng}&endLat=${endLat}&endLng=${endLng}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    })
      .then(resp => {
        return resp
      })
      .catch(e => {
        Alert.alert(e);
      });
  }

  async getDirections(startLoc, destinationLoc) {
    if (startLoc.lat) {
      startLoc = `${startLoc.lat},${startLoc.lng}`;
    }

    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      const startLat = respJson.routes[0].legs[0].start_location.lat;
      const startLng = respJson.routes[0].legs[0].start_location.lng;
      const endLat = respJson.routes[0].legs[0].end_location.lat;
      const endLng = respJson.routes[0].legs[0].end_location.lng;
      console.log('startLat, startLng', startLat, startLng);
      console.log('duration', respJson.routes[0].legs[0].duration.text);
      console.log('endLat, endLng', endLat, endLng);
      const waypoints = await this.fetchWaypoints(startLat, startLng, endLat, endLat, userPrefs);
      console.log('finished fetchWaypoints')
      // AsyncStorage.getItem('preferences').then(value => console.log(value))
      //   .then(() => {
      //     this.fetchWaypoints(startLat, startLng, endLat, endLng);
      //   });

      const waypointsLatLong = [];
      waypoints.forEach( waypoint => {
        latLong = `via:${waypoint.lat},${waypoint.lng}`;
        waypointsLatLong.push(latLong);
      })
      const urlStructuredWaypoints = waypointsLatLong.join('|');
      const structuredUrl = `
      https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}
      &waypoints=${urlStructuredWaypoints}`;

      const finalResp= await fetch(structuredUrl);
      const finalRespJson = await finalResp.json();
      console.log(finalRespJson);
      consoleo.log('finished final fetch');




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

  _toggleOptions() {
    let newOption = !this.state.optionsDisplayed;
    this.setState({ optionsDisplayed: newOption });
  }
  render() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);

    if (this.state.loading) {
      return <SplashLoading />;
    } else {
      return (
        <View style={styles.test}>
          {this.state.optionsDisplayed && (
            <PreferencesModal toggle={this._toggleOptions} />
          )}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.currPosition.lat,
              longitude: this.state.currPosition.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.currPosition.lat,
                longitude: this.state.currPosition.lng
              }}
              image={require("../images/curr_loc_marker.png")}
            />
          </MapView>
          <View style={styles.searchBox}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("DrawerOpen");
              }}
            >
              <View style={styles.button}>
                <Image
                  style={{ width: 25, height: 30 }}
                  source={require("../images/blue_hamburger_icon.png")}
                />
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.directionInput}
              onChangeText={destinationText =>
                this.setState({ destinationText })}
              onSubmitEditing={() => {
                this.getDirections(
                  this.state.currPosition,
                  this.state.destinationText
                );
              }}
            />

            <TouchableOpacity
              onPress={() => {
                this._toggleOptions();
              }}
            >
              <View style={styles.button}>
                <Image
                  source={require("../images/blue_sliders.png")}
                  style={{ width: 25, height: 30 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

var width = Dimensions.get("window").width;
var searchBoxWidth = width * 0.92;
var inputWidth = width * 0.62;
var buttonWidth = (searchBoxWidth - inputWidth) / 2;

const styles = StyleSheet.create({
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
  searchBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: searchBoxWidth,
    height: 55,
    borderRadius: 3,
    position: "absolute",
    top: 65,
    backgroundColor: "white"
  },
  directionInput: {
    width: inputWidth,
    height: 55,
    // borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: buttonWidth,
    height: 55
  }
});
