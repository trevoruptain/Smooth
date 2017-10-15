import Home from "./frontend/components/home";
import React, { Component } from "react";
import DrawerRoutes from "../.config/routers";

export default class App extends Component {
  render() {
    return <DrawerRoutes />;
  }
}
