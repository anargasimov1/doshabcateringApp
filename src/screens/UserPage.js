import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Panel from '../companents/Panel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6';

const UserPage = ({ route }) => {
    const [location, setLocation] = useState({});
    const [current, setCurrent] = useState(false);
    const [indicator, setIndicator] = useState(false)

    useEffect(() => {
        getLocation();
    }, [location])

    useEffect(() => {
        getUserData()
    }, [])


    const getLocation = async () => {
        setIndicator(true)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('sizin icazeni levğ eləmisiz')
                return;
            }
            let coords = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            setLocation({
                latitude: coords.coords.latitude,
                longitude: coords.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })

        } catch (error) {
            console.log(error)
        }
        setCurrent(true)
        setIndicator(false)
    }



    const { id } = route.params;

    const [user, setUser] = useState('')

    const navigation = useNavigation()

    async function singUp() {
        await AsyncStorage.removeItem('token')
        navigation.replace('login')
    }

    async function getUserData() {
        try {
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log('Belə bir sənəd mövcud deyil');
            }
        } catch (error) {
            console.error('Xəta baş verdi:', error);
        }
    }



    return (
        <>

            <View style={styles.contanier} >
            </View>
            <View style={styles.headText}>

                <Text style={styles.text}>
                    Xoş gəlmisən  {user.name}
                </Text>
            </View>


            <Text style={styles.text}>
                adi:  {user.name}
            </Text>
            <Text style={styles.text}>
                email:  {user.email}
            </Text>
            <Text style={styles.text}>
                nomre: {user.phone}
            </Text>
            {indicator ? <ActivityIndicator style={styles.indicator} size="large" color="blue" /> : null}

            {
                current ?
                    <MapView
                        style={styles.map}
                        region={location}
                    >
                        {<Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="My Marker" pinColor='red' />}
                    </MapView> :

                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 40.56,
                            longitude: 49.126
                        }}
                    >
                        {<Marker coordinate={{ latitude: 50.56, longitude: 49.123 }} title="My Marker" pinColor='blue' />}
                    </MapView>

            }

            <Pressable onPress={() => singUp()} style={styles.button}>
                <Text style={styles.text}>
                    Çıxış
                </Text>
            </Pressable>
            <Pressable onPress={() => { getLocation(), setIndicator(true) }} style={styles.buttonLocation}>
                <FontAwesomeIcon6 style={styles.icon} name="location-crosshairs" />
            </Pressable>

            <Panel />

        </>
    )
}

export default UserPage

const styles = StyleSheet.create({
    contanier: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    headText: {
        flexDirection: 'row',
        gap: 20,
    },
    title: {
        backgroundColor: 'grey',
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    titletext: {

    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
        color: '#9592a1',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: 'red'
    },
    map: {
        width: 380,
        height: 300
    },
    icon: {
        fontSize: 30,
        color: '#9592a1'
    },
    buttonLocation: {
        marginTop: 50,
        marginLeft: 50,
        position: 'absolute',
        top: 350,
        right: 50,
    },
    indicator: {
        width: 380,
        height: 300,
        position: 'absolute',
        zIndex: 25,
        backgroundColor: 'grey',
        opacity: 0.5,
        top: 160
    }
})