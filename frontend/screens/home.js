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
import PreferencesModal from './preferences/preferences_modal'

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      optionsDisplayed: false,
      destinationText: "",
      defaultStart: "825 Battery Street, San Francisco, CA"
    };

    this._toggleOptions = this._toggleOptions.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  fetchWaypoints(endLat, endLng) {
    console.log("endLat", endLat);
    fetch(`/api/intersections`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        endLat: endLat,
        endLng: endLng
      })
    })
      .then(resp => console.log(resp))
      // .then( (respJson) => {
      //   return respJson
      // })
      .catch(e => {
        console.log(e);
      });

    // .then(function(resp) {
    //   if (resp.status == 200) {
    //     return resp.json();
    //   } else throw new Error('Trevor sucks, error on the API server');
    // })
    // .then(resp => {
    //   console.debug(resp);
    // })
    // .catch(e => {
    //   console.error(e);
    // })
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      const latNum = respJson.routes[0].legs[0].end_location.lat;
      const lngNum = respJson.routes[0].legs[0].end_location.lng;
      console.log(latNum, lngNum);

      this.fetchWaypoints(latNum, lngNum);

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
    this.setState({ optionsDisplayed: newOption })
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
          {this.state.optionsDisplayed && <PreferencesModal toggle={ this._toggleOptions } />}
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
                  this.state.defaultStart,
                  this.state.destinationText
                );
              }}
            />

            <TouchableOpacity onPress={() => {
              this._toggleOptions()
            }}>

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
