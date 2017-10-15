import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class PreferencesTray extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.overlay}>
                <Text style={{ fontSize: 30, color: "white" }}>Hey!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: "center",
        justifyContent: "center"
    },
});
