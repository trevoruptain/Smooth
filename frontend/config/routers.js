import React, { Component } from "react";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Home from "../screens/home";
import Preferences from "../screens/preferences/preferences";
import RideOptions from "../screens/ride_options/ride_options";
import Help from "../screens/help/help";
import Menu from "../screens/menu/menu";

const StackRoutes = StackNavigator({
  Home: {
    screen: Home
  },
  Preferences: {
    screen: Preferences
  },
  RideOptions: {
    screen: RideOptions
  },
  Help: {
    screen: Help
  }
});

const DrawerRoutes = DrawerNavigator(
  {
    Stack: {
      screen: StackRoutes
    }
  },
  { contentComponent: props => <Menu {...props} /> }
);

export default DrawerRoutes;
