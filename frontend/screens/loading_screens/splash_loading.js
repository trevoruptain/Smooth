import React from "react";
import {
    StyleSheet,
    View,
    Image,
} from "react-native";

class SplashLoading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loadingScreen}>
                    <Image
                        source={require("../../images/smooth_animation.gif")}
                        style={styles.animation}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D8DFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingScreen: {
        flex: 0.1,
        paddingBottom: 50
    },
    animation: {
        flex: 1,
    },
    });

export default SplashLoading;