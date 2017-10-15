import React from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require("../../images/smooth_logo_menu.png")}
          />
        </View>
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

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
  },
});
