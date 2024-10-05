import React from 'react';
import { View, StyleSheet, Image } from 'react-native';


const SplashScreen = ({ navigation }) => {

    setTimeout(() => { navigation.replace('Home') }, 3500);

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/icon.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    img: {
        width: "131%",
        height: "100%",
        objectFit: 'fill'
    },
});
export default SplashScreen;
