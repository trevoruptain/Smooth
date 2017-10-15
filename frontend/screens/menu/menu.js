import React from "react";
import { Text, View, Image, Button } from "react-native";

export default class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>HEADER WITH BIKE ICON</Text>
        <Button
          onPress={() => navigate("Preferences", {})}
          title="Preferences"
        />
        <Button
          onPress={() => navigate("RideOptions", {})}
          title="Get a Ride"
        />
        <Button onPress={() => navigate("Help", {})} title="Help" />
      </View>
    );
  }
}
