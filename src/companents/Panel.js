import { View, Pressable, Linking, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Panel = () => {

    const navigation = useNavigation();

    const openurlWp = async () => await Linking.openURL('https://wa.link/v86573');


    return (
        <View style={styles.container}>

            <Pressable onPress={() => navigation.navigate('Home')}>
                <MaterialIcon style={styles.icon} name='home' />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('menu')}>
                <MaterialIcon style={styles.icon} name='restaurant-menu' />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('login')}>
                <MaterialIcon style={styles.icon} name='person' />
            </Pressable>

            <Pressable onPress={() => openurlWp()}>
                <FontAwesomeIcon style={styles.icon} name='whatsapp' />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('wishlist')}>
                <MaterialIcon name='shopping-bag' style={styles.icon} />
            </Pressable>

        </View>
    )
}

export default Panel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: -5,
        width: '100%',
        opacity: 0.8,
        backgroundColor: 'white'
    },
    icon: {
        color: 'grey',
        fontSize: 27
    }
})
