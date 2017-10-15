import React from "react";
import { Text, View, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import PreferencesTray from './preferences_tray';

export default class PreferencesModal extends React.Component {
 
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.overlay}>
                <TouchableOpacity onPress={this.props.toggle} style={styles.touchable}/>
                <PreferencesTray toggle={this.props.toggle} width={width} />
            </View>
        );
    }
}

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: width,
        height: height,
        zIndex: 99
    },
    touchable: {
        flex: 1
    }
});
